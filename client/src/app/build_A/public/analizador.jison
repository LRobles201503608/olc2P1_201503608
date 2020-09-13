/* Definición Léxica */
%lex

%options case-sensitive

%{

%}

%%

\s+											// se ignoran espacios en blanco
"//".*										// comentario simple línea
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]			// comentario multiple líneas

"let"         return 'RLET';
"const"       return 'RCONST';
"var"         return 'RVAR'
"function"    return 'RFUNCTION';
"string"			return 'RSTRING';
"number"		    	return 'RINT';
"boolean"			return 'RBOOLEAN';
"type"       return 'RTYPE'
"do"            return 'DO';
"while"			    return 'WHILE';
"if"				return 'IF';
"else"				return 'ELSE';
"for"				return 'FOR';
"switch"			return 'SWITCH';
"case"				return 'CASE';
"default"			return 'DEFAULT';
"break"				return 'BREAK';
"continue"          return 'CONTINUE';
"return"            return 'RETURN';
"void"              return 'VOID';
"true"              return 'TRUE';
"false"             return 'FALSE';
"console.log"     return 'PRINT';
"graficar_ts"     return 'RGRAFICA';
"null"            return 'RNULL';
"of"              return 'ROF';
"in"              return 'RIN';
"Push"            return 'PUSH'
"Pop"             return 'POP'
"length"          return 'LENGTH'


":"					return 'DOSP';
";"					return 'PYCOMA';
"{"					return 'LLA';
"}"					return 'LLC';
"("					return 'PARENTA';
")"					return 'PARENTC';
","					return 'COMA';
"."         return 'PUNTO';
"["         return 'CORCHETEA';
"]"         return 'CORCHETEC';
"?"         return 'INTERROGACION';


"!="				return 'DIF';

"++"        return 'INCREMENTO';
"--"        return 'DECREMENTO';
"**"        return 'POT';
"+="        return 'AUTOSUM';

"&&"				return 'AND'
"||"				return 'OR';
"!"					return 'NOT';

"+"					return 'MAS';
"-"					return 'MENOS';
"*"					return 'POR';
"/"					return 'DIVIDIDO';
"%"         return 'MOD';

"<="				return 'MENIGU';
">="				return 'MAYIGU';
"=="				return 'IG';

"<"					return 'MEN';
">"					return 'MAY';
"="					return 'IGUAL';


\"[^\"]*\"				{ yytext = yytext.substr(1,yyleng-2); return 'CADENA'; }
\'[^\']*\'				{ yytext = yytext.substr(1,yyleng-2); return 'CADENA'; }
\`[^\`]*\`        { yytext = yytext.substr(1,yyleng-2); return 'CADENAE'; }
[0-9]+("."[0-9]+)?\b  	return 'DECIMAL';
[0-9]+\b				return 'ENTERO';
(_?[a-zA-Z])[a-zA-Z0-9_]*	return 'IDENTIFICADOR';


<<EOF>>				return 'EOF';
.	                { console.log('error :v') }

/lex
%{
  // codigo para ir armando el ast
    const {Primitivos}= require('../Expresiones/Primitivos');
    const {Aritmetica} = require('../Expresiones/Aritmeticas');
    const {Relacional} = require('../Expresiones/Relacional');
    const {Logica} = require('../Expresiones/Logicas');
    const {Identifier} = require('../Expresiones/Identifier');
    const {print} = require('../Instruccion/Print');
    const {Error} = require('../util/Errors');
    const {Type, types} = require('../util/Types');
    const {Tree} = require('../Simbols/Tree');
    const {If} = require('../Instruccion/If');
    const {DoWhile} = require('../Instruccion/DoWhile');
    const {While} = require('../Instruccion/While');
%}

%left OR
%left AND
%left DIF IG
%left MENIGU MAYIGU MENQUE MAYQUE
%left MAS MENOS AUTOSUM
%left POR DIVIDIDO
%left POT MOD
%right NOT
%left UMENOS

%start inicio

%% /* Definición de la gramática */

inicio
  : l_ins EOF {$$ = new Tree($1); return $$;}
;

l_ins
  : l_ins ins {$$ = $1; $$.push($2);}
  | ins {$$ = [$1];}
;
//******************************INSTRUCCIONES*****************************
ins
  : asignacion_declaracion {}
  | asignacion {}
  | metodo_funcion {}
  | structs {}
  | funciones_nativas {$$=$1;}
  | sentencias {}
  | RETURN retorno final_linea {}
  | CONTINUE final_linea {}
;
l_ins2
  : l_ins2 ins2 {}
  | ins2 {}
;
//******************************INSTRUCCIONES dentro de funciones*****************************
ins2
  : asignacion_declaracion {}
  | asignacion {}
  | structs {}
  | funciones_nativas {}
  | sentencias {}
  | RETURN retorno final_linea {}
  | CONTINUE final_linea {}
;

retorno
  : expresion {}
  | {}
;

asignacion_declaracion
  : constancia IDENTIFICADOR IGUAL expresion final_linea {}
  | constancia IDENTIFICADOR final_linea {}
  | constancia IDENTIFICADOR DOSP tipo IGUAL expresion final_linea {}
  | constancia IDENTIFICADOR DOSP tipo final_linea {}
  | constancia lista_asigna final_linea {}
  | constancia IDENTIFICADOR arreglo_mat final_linea {}
  | constancia IDENTIFICADOR arreglo_mat IGUAL arreglo_mat2 final_linea {}
  | llamado_funcion {}
  | acceso {}
  | error {}
;
final_linea
  : PYCOMA {}
  | {}
;

arreglo_mat
  : arreglo_mat CORCHETEA CORCHETEC {}
  | CORCHETEA CORCHETEC {}
;

lista_asigna
  : lista_asigna COMA IDENTIFICADOR asigl{}
  | IDENTIFICADOR asigl{}
  | lista_asigna COMA IDENTIFICADOR DOSP tipo asigl{}
  | IDENTIFICADOR DOSP tipo asigl{}
;
asigl
  : IGUAL expresion {}
  | {}
  | error {}
;

arreglo_params
  : arreglo_params COMA expresion {}
  | expresion {}
  | {}
;

constancia
  : RLET {}
  | RCONST {}
  | RVAR {}
;

asignacion
  : IDENTIFICADOR IGUAL expresion final_linea {}
  | IDENTIFICADOR arreglo_params IGUAL expresion final_linea {}
  | actualizar {}
  | asignacion_types {}
;

asignacion_types
  : IDENTIFICADOR IGUAL LLA contenido_types LLC
;

contenido_types
  : contenido_types COMA IDENTIFICADOR DOSP expresion {}
  | IDENTIFICADOR DOSP expresion {}
;

actualizar
  : IDENTIFICADOR INCREMENTO {}
  | IDENTIFICADOR DECREMENTO {}
;

acceso
  : acceso PUNTO IDENTIFICADOR IGUAL expresion {}
  | acceso PUNTO IDENTIFICADOR {}
  | IDENTIFICADOR {}
;

metodo_funcion
  : RFUNCTION IDENTIFICADOR PARENTA parametro PARENTC LLA l_ins2 LLC {}
  | RFUNCTION IDENTIFICADOR PARENTA parametro PARENTC LLA LLC {}
  | RFUNCTION IDENTIFICADOR PARENTA PARENTC LLA l_ins2 LLC {}
  | RFUNCTION IDENTIFICADOR PARENTA PARENTC LLA LLC {}
  | RFUNCTION IDENTIFICADOR PARENTA parametro PARENTC DOSP tipo LLA l_ins2 LLC {}
  | RFUNCTION IDENTIFICADOR PARENTA parametro PARENTC DOSP tipo LLA LLC {}
  | RFUNCTION IDENTIFICADOR PARENTA PARENTC DOSP tipo LLA l_ins2 LLC {}
  | RFUNCTION IDENTIFICADOR PARENTA PARENTC DOSP tipo LLA LLC {}
;

parametro
  : IDENTIFICADOR DOSP tipo parametro2{}
  | IDENTIFICADOR parametro2 {}
  | error {}
;

parametro2
  : COMA IDENTIFICADOR DOSP tipo parametro2{}
  | COMA IDENTIFICADOR parametro2 {}
  | {}
;

structs
  : RTYPE IDENTIFICADOR IGUAL LLA contenido_struct LLC {}
;

contenido_struct
  : contenido_struct COMA IDENTIFICADOR DOSP tipo {}
  | IDENTIFICADOR DOSP tipo {}
;

tipo
  : RSTRING dimensional{ $$ = new Type(types.STRING);}
  | RINT dimensional{ $$ = new Type(types.NUMERIC);}
  | boolean dimensional{$$ = new Type(types.BOOLEAN);}
  | IDENTIFICADOR dimensional{}
  | VOID {$$ = new Type(types.VOID);}
;
dimensional
  : dimensional CORCHETEA CORCHETEC {}
  | CORCHETEA CORCHETEC {}
  | {}
  |error
;
dimensional2
  : dimensional2 CORCHETEA expresion CORCHETEC {}
  | CORCHETEA expresion CORCHETEC {}
  | {}
  |error
;
funciones_nativas
  : imprimir {$$=$1;}
  | graficar {}
;

imprimir
  : PRINT PARENTA PARENTC {$$= new print('\n', @1.first_line,@1.first_column);}
  | PRINT PARENTA expresion PARENTC {$$= new print($3, @1.first_line,@1.first_column);}
;

graficar
  : RGRAFICA PARENTA PARENTC {}
;

sentencias
  : sentenciafor {$$=$1;}
  | sentenciawhile {$$=$1;}
  | sentenciadowhile {$$=$1;}
  | sentenciaif {$$=$1;}
  | sentenciaswitch {$$=$1;}
;

sentenciafor
    : FOR PARENTA RLET IDENTIFICADOR IGUAL expresion PYCOMA expresion PYCOMA asignacion PARENTC cuerposentencia {}
    | FOR PARENTA RLET IDENTIFICADOR PYCOMA expresion PYCOMA asignacion PARENTC cuerposentencia {}
    | FOR PARENTA RVAR IDENTIFICADOR IGUAL expresion PYCOMA expresion PYCOMA asignacion PARENTC cuerposentencia {}
    | FOR PARENTA RVAR IDENTIFICADOR PYCOMA expresion PYCOMA asignacion PARENTC cuerposentencia {}
    | FOR PARENTA RLET IDENTIFICADOR ROF IDENTIFICADOR PARENTC cuerposentencia {}
    | FOR PARENTA RLET IDENTIFICADOR RIN IDENTIFICADOR PARENTC cuerposentencia {}
;

sentenciawhile
    :   WHILE PARENTA expresion PARENTC cuerposentencia {}
;

sentenciadowhile
    :   DO cuerposentencia WHILE PARENTA expresion PARENTC final_linea {}
;

sentenciaif
    : IF PARENTA expresion PARENTC cuerposentencia2 {$$ = new If($3, $5, [], @1.first_line, @1.first_column);}
    | IF PARENTA expresion PARENTC cuerposentencia2 ELSE cuerposentencia2 {$$ = new If($3, $5, $7, @1.first_line, @1.first_column);}
    | IF PARENTA expresion PARENTC cuerposentencia2 ELSE sentenciaif {$$ = new If($3, $5, [$7], @1.first_line, @1.first_column);}
;

selse
    : ELSE cuerposentencia2 {}
;

selseif
    : selseif sinosi {}
    | sinosi {}
;

sinosi
    : ELSE IF PARENTA expresion PARENTC cuerposentencia2 {}
;

sentenciaswitch
    : SWITCH PARENTA expresion PARENTC LLA listacase LLC {}
;

listacase
    : listacase cases {}
    | cases {}
;

cases
    : CASE expresion DOSP instrucciones_funciones {}
    | CASE expresion DOSP {}
    | DEFAULT DOSP instrucciones_funciones {}
    | DEFAULT DOSP {}
;

cuerposentencia
    : LLA instrucciones_funciones LLC {$$=$2;}
    | LLA LLC {$$="VACIO"}
;

instrucciones_funciones
    : instrucciones_funciones instru_f {$1.push($2);  $$ = $1;}
    | instru_f {$$ = [$1];}
;

instru_f
    : asignacion_declaracion final_linea {$$=$1;}
    | asignacion {$$=$1}
    | sentencias {$$=$1;}
    | BREAK final_linea {}
    | CONTINUE final_linea {}
    | imprimir final_linea{$$=$1;}
    | error {}
;

cuerposentencia2
    : LLA instrucciones_funciones LLC {$$=$2;}
    | LLA LLC {$$="VACIO"}
;

instrucciones_funciones2
    : instrucciones_funciones instru_f {$1.push($2);  $$ = $1;}
    | instru_f {$$ = [$1];}
;

instru_f2
    : asignacion_declaracion final_linea {$$=$1;}
    | sentencias {$$=$1;}
    | CONTINUE final_linea {}
    | imprimir final_linea{$$=$1;}
    | llamado_funcion {}
    | error {}
;

llamado_funcion
  : IDENTIFICADOR PARENTA parammm PARENTC final_linea {}
  | IDENTIFICADOR PARENTA PARENTC final_linea {}
;

parammm
  : parammm COMA expresion {}
  | expresion {}
;
parametraje
  : parametraje COMA expresion {}
  | expresion {}
;

expresion
    : MENOS expresion %prec UMENOS {$$= new Aritmetica($2, null, '-',@1.first_line,@1.first_column);}
    | ENTERO {$$= new Primitivos(new Type(types.NUMERIC),Number($1),@1.first_line,@1.first_column);}
    | TRUE {$$= new Primitivos(new Type(types.BOOLEAN),true,@1.first_line,@1.first_column);}
    | FALSE {$$= new Primitivos(new Type(types.BOOLEAN),false,@1.first_line,@1.first_column);}
    | DECIMAL {$$= new Primitivos(new Type(types.NUMERIC),Number($1),@1.first_line,@1.first_column);}
    | CADENA {$$= new Primitivos(new Type(types.STRING),$1,@1.first_line,@1.first_column);}
    | CADENAE {$$= new Primitivos(new Type(types.STRING),$1,@1.first_line,@1.first_column);}
    | IDENTIFICADOR {$$ = new Identifier($1, @1.first_line, @1.first_column);}
    | IDENTIFICADOR dimensional2{}
    | IDENTIFICADOR dimensional2 PUNTO LENGTH {}
    | IDENTIFICADOR PUNTO LENGTH {}
    | actualizar {$$=$1;}
    | expresion COMA expresion {}
    | expresion MAS expresion {$$= new Aritmetica($1, $3, '+',@1.first_line,@1.first_column);}
    | expresion MENOS expresion {$$= new Aritmetica($1, $3, '-',@1.first_line,@1.first_column);}
    | expresion POR expresion {$$= new Aritmetica($1, $3, '*',@1.first_line,@1.first_column);}
    | expresion DIVIDIDO expresion {$$= new Aritmetica($1, $3, '/',@1.first_line,@1.first_column);}
    | expresion POT expresion {$$= new Aritmetica($1, $3, '**',@1.first_line,@1.first_column);}
    | expresion MOD expresion {$$= new Aritmetica($1, $3, '%',@1.first_line,@1.first_column);}
    | PARENTA expresion PARENTC {$$=$2;}
    | expresion AND expresion {$$ = new Logica($1,$3,'&&',@1.first_line,@1.first_column);}
    | expresion OR expresion {$$ = new Logica($1,$3,'||',@1.first_line,@1.first_column);}
    | NOT expresion {$$ = new Logica($2,null,'!',@1.first_line,@1.first_column);}
    | expresion DIF expresion {$$= new Relacional($1,$3,'!=',@1.first_line,@1.first_column);}
    | expresion MAYIGU expresion {$$= new Relacional($1,$3,'>=',@1.first_line,@1.first_column);}
    | expresion MENIGU expresion {$$= new Relacional($1,$3,'<=',@1.first_line,@1.first_column);}
    | expresion MAY expresion {$$= new Relacional($1,$3,'>',@1.first_line,@1.first_column);}
    | expresion MEN expresion {$$= new Relacional($1,$3,'<',@1.first_line,@1.first_column);}
    | expresion IG expresion {$$= new Relacional($1,$3,'==',@1.first_line,@1.first_column);}
    | llamado_funcion {$$=$1;}
    | arreglo_mat2 {}
    | op_terna {}
    | RNULL {}
    | IDENTIFICADOR PUNTO nativo_mat {}
    | acceso {}
    | error {}
;

arreglo_mat2
  : CORCHETEA arreglo_params CORCHETEC {}
  | {}
  | error {}
;
op_terna
  : condicion INTERROGACION expresion DOSP expresion {}
;

condicion
  : expresion AND expresion {}
    | expresion OR expresion {}
    | NOT expresion {}
    | expresion DIF expresion {}
    | expresion MAYIGU expresion {}
    | expresion MENIGU expresion {}
    | expresion MAY expresion {}
    | expresion MEN expresion {}
    | expresion IG expresion {}
;

nativo_mat
  : POP PARENTA PARENTC{}
  | PUSH PARENTA lista_push PARENTC {}
  | LENGTH {}
;

lista_push
  : lista_push COMA expresion {}
  | expresion {}
;

funciones_mat
  : PUNTO nativo_mat {}
  | {}
  | error {}
;
