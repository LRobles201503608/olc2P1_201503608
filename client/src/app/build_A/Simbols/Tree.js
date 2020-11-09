"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tree = void 0;
/**
 * esta @clase almacena el ast generado y la lista de instrucciones
 * */
class Tree {
    constructor(instructions) {
        this.instructions = instructions;
        this.console = new Array();
        this.errores = new Array();
        this.repent = new Array();
        this.cabecera = new Array();
        this.traduccion = new Array();
        this.tmpsop = new Array();
        this.operatemp = new Array();
        this.operalist = new Array();
        this.tmplis = new Array();
        this.registroTemporales = new Array();
        this.codigo3D = "";
        this.aux3D = "";
        this.temp = 0;
        this.etiqueta = 0;
        this.posh = 0;
        this.poss = 0;
    }
    setTable(table) {
        this.globalofensive = table;
    }
    setHeader() {
        //crea las primeras lineas del  encabezado pero no las temporales,
        // esas se definen luego
        let cadenainicial = "";
        cadenainicial += "#include <stdio.h>\ndouble heap[1638400]={-1}; \ndouble stack[1639400]={-1}; \ndouble p=0; \ndouble h=0;\n";
        this.cabecera.push(cadenainicial);
    }
    setTemporalesHeader() {
        let cadenainicial = "double ";
        for (let i = 0; i <= this.temp; i++) {
            if (i == this.temp) {
                cadenainicial += "t" + i + ";";
            }
            else {
                cadenainicial += "t" + i + ",";
            }
        }
        return cadenainicial;
    }
    //operaciones con los temporales durante la generacion del codigo
    getPrevTemp(n) { return "t" + (this.temp - n); } //retorna el temporal generado n veces antes
    lastTemp() {
        return "t" + (this.temp - 1);
    }
    //generacion de etiquetas durante la generacion del codigo
    getEtq() {
        var etiqueta = this.etiqueta;
        this.etiqueta++;
        return "L" + etiqueta;
    }
    generar_3d(op, arg1, arg2, destino) {
        let res = destino + ' = ' + arg1 + ' ' + op + ' ' + arg2 + ';\n';
        this.traduccion.push(res);
        return res;
    }
    modificar_stack(indice, destino) {
        let res = 'stack[' + indice + '] = ' + destino + ';\n';
        this.traduccion.push(res);
        return res;
    }
    modificar_heap(indice, destino) {
        let res = 'heap[' + indice + '] = ' + destino + ';\n';
        this.traduccion.push(res);
        return res;
    }
    obtener_puntero_h(destino) {
        return destino + ' = H;\n';
    }
    generar_asignacion(origen, destino) {
        return destino + ' = ' + origen + ';\n';
    }
    obtener_stack(indice, destino) {
        let res = destino + ' = stack[' + indice + '];\n';
        this.traduccion.push(res);
        return destino;
    }
    obtener_Heap(indice, destino) {
        let res = destino + ' = heap[' + indice + '];\n';
        this.traduccion.push(res);
        return destino;
    }
    generarIFC3D(condicion, gotosi, gotono) {
        let res = "if(" + condicion + ") goto " + gotosi + ";\n\tgoto " + gotono + ";\n";
        this.traduccion.push(res);
        return res;
    }
    generarWhileC3D(condicion, gotosi, gotono) {
        let res = "if(" + condicion + ") goto " + gotosi + ";\n\tgoto " + gotono + ";\n";
        this.traduccion.push(res);
        return res;
    }
}
exports.Tree = Tree;
