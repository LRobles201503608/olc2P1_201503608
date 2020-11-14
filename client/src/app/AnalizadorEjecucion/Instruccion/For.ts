import { Node } from "../Abstract/Node"
import { Table } from "../Simbols/Table";
import { Tree } from "../Simbols/Tree";
import { Error } from "../util/Errors";
import { types,Type } from "../util/Types";
import { Continue } from "../Expresiones/Continue";
import { Break } from "../Expresiones/Break";
import { Declaracion } from "./Declaracion";
import { Primitivos } from "../Expresiones/Primitivos";

/**
 * @class Ejecuta una serie de instrucciones en caso la condicion sea verdadera sino ejecuta las instrucciones falsas
 */
export class For extends Node {
    declaracion:String;
    condition: Node;
    asignacion:Node;
    expresiondecla:Node;
    List: Array<Node>;
    line:number;
    column:number;
    /**
     * @constructor
     * @param declaracion nodo de declaraciones
     * @param condition
     *
     * @param List
     * @param line
     * @param column
     */
    constructor(declaracion:String,expresiondecla:Node,condition: Node, asignacion:Node,List: Array<Node>, line: number, column: number) {
        super(null, line, column,true);
        this.declaracion=declaracion;
        this.condition = condition;
        this.asignacion=asignacion;
        this.List = List;
        this.column=column;
        this.line=line;
        this.expresiondecla=expresiondecla;
    }
    traducir(tabla:Table,tree: Tree,cadena:string,contTemp:number) {
      let L1="L"+tree.etiqueta;
      tree.etiqueta++;
      let L2="L"+tree.etiqueta;
      tree.etiqueta++;
      let L3="L"+tree.etiqueta;
      tree.etiqueta++;
      tree.operalist.push(L1);
      tree.operalist.push(L2);
      tree.operalist.push(L3);
      tree.traduccion.push(L3+":\n");
      let condicion;
      debugger;
      let a=this.condition.traducir(tabla,tree,cadena,contTemp);
      if(this.condition instanceof Primitivos){
        condicion = a;
      }else{
        condicion ="(int)"+tree.tmpsop.pop();
      }

      let gen= tree.generarWhileC3D(condicion.toString(),L1.toString(),L2.toString());
    }
    execute(table: Table, tree: Tree):any {
        const newtable = new Table(table);
        table.hijos.push(newtable);
        let crearvar:Node=new Declaracion(null,this.declaracion,this.expresiondecla,this.line,this.column,true);
        let variable:Node
        variable= crearvar.execute(newtable,tree);
        crearvar.traducir(newtable,tree,"",0);

        let result: Node;
        result = this.condition.execute(newtable, tree);

        let L1;
        let L2;
        let L3;
        let traducidas=0;
        this.traducir(newtable,tree,"",0);
        L3=tree.operalist.pop();
        L2=tree.operalist.pop();
        L1=tree.operalist.pop();
        tree.traduccion.push(L1+":\n");

        if (result instanceof Error) {
          return result;
        }
        this.condition.type=new Type(types.BOOLEAN);
        if (this.condition.type.type !== types.BOOLEAN) {
            const error = new Error('Semantico','Se esperaba una expresion booleana para la condicion',this.line, this.column);
            tree.errores.push(error);
            tree.console.push(error.toString());
            return error;
        }
        let newtable2;
        while(this.condition.execute(newtable, tree)){
          newtable2= new Table(newtable);
          newtable.hijos.push(newtable2);
          if (result instanceof Error) {
            return result;
         }
        this.condition.type = new Type(types.BOOLEAN);
        if (this.condition.type.type !== types.BOOLEAN) {
            const error = new Error('Semantico', 'Se esperaba una expresion booleana para la condicion', this.line, this.column);
            tree.errores.push(error);
            tree.console.push(error.toString());
            return error;
        }
        if (result) {
            for (let i = 0; i < this.List.length; i++) {
                if (String(this.List[i]) == ";") {

                }else{
                  const res = this.List[i].execute(newtable2, tree);
                  if (res instanceof Continue) {
                    tree.traduccion.push(L2+":\n");
                      break;
                  }
                  else if (res instanceof Break) {
                    tree.traduccion.push(L2+":\n");
                      return;
                  }
                }
            }
            traducidas++;
            this.asignacion.execute(newtable,tree);
            if(traducidas==1){

            }
        }
      }
      tree.traduccion.push("goto "+L3+";\n");
      tree.traduccion.push(L2+":\n");
        /*
        if(result){
          do {
            result = this.condition.execute(newtable, tree);
            if (result instanceof Error) {
                return result;
            }
            this.condition.type=new Type(types.BOOLEAN);
            if (this.condition.type.type !== types.BOOLEAN) {
                const error = new Error('Semantico','Se esperaba una expresion booleana para la condicion',this.line, this.column);
                tree.errores.push(error);
                tree.console.push(error.toString());
                return error;
            }
            if (result) {
                for (let i = 0; i < this.List.length; i++) {
                  if(String(this.List[i])==";"){
                    return;
                  }
                    const res = this.List[i].execute(newtable, tree);
                    if (res instanceof Continue) {
                        break;
                    } else if (res instanceof Break) {
                        return;
                    }
                }
            }
        } while (result);
        }*/
        return null;
    }
}
