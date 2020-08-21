/* Definición Léxica */
%lex

%options case-insensitive

%{
	const LERRORES	= require('./ast').LERRORES;
%}

%%

\s+											// se ignoran espacios en blanco
"//".*										// comentario simple línea
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]			// comentario multiple líneas

"String"			return 'RSTRING';
"int"		    	return 'RINT';
"double"			return 'RDOUBLE';
"bool"			return 'RBOOLEAN';
"char"			    return 'RCHAR';
"do"                return 'DO';
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
"Console.Write"     return 'PRINT';
"class"             return 'RCLASS'

":"					return 'DOSP';
";"					return 'PYCOMA';
"{"					return 'LLA';
"}"					return 'LLC';
"("					return 'PARENTA';
")"					return 'PARENTC';
","					return 'COMA';

"&&"				return 'AND'
"||"				return 'OR';
"!"					return 'NOT';

"++"                return 'INCREMENTO';
"--"                return 'DECREMENTO';

"+"					return 'MAS';
"-"					return 'MENOS';
"*"					return 'POR';
"/"					return 'DIVIDIDO';
"^"                 return 'POT';
"%"                 return 'MOD';

"<="				return 'MENIGU';
">="				return 'MAYIGU';
"=="				return 'IG';
"!="				return 'DIF';

"<"					return 'MEN';
">"					return 'MAY';
"="					return 'IGUAL';



\"[^\"]*\"				{ yytext = yytext.substr(1,yyleng-2); return 'CADENA'; }
\'[^\']*\'				{ yytext = yytext.substr(1,yyleng-2); return 'CADENAH'; }
[0-9]+("."[0-9]+)?\b  	return 'DECIMAL';
[0-9]+\b				return 'ENTERO';
\'[.]?\'                    return 'CHAR';
(_?[a-zA-Z])[a-zA-Z0-9_]*	return 'IDENTIFICADOR';


<<EOF>>				return 'EOF';
.	                { $$ = LERRORES.astErrores(LERRORES.astError(yytext , yylloc.first_line , yylloc.first_column, "Lexico")); LERRORES.astPrint($$);$$="";}

/lex
