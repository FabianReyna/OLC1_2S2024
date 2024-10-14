%{
  //codigo JS
  const Tipo = require('./simbolo/Tipo')
  const Nativo = require('./expresiones/Nativo')
  const Aritmeticas = require('./expresiones/Aritmeticas')
  const Relacionales = require('./expresiones/Relacionales')
  const AccesoVar = require('./expresiones/AccesoVar') 

  const Print = require('./instrucciones/Print')
  const Declaracion = require('./instrucciones/Declaracion')
  const AsignacionVar = require('./instrucciones/AsignacionVar')
  const If = require('./instrucciones/If')
  const While = require('./instrucciones/While')
  const Metodo = require('./instrucciones/Metodo')
  const Llamada = require('./instrucciones/Llamada')
  const Run = require('./instrucciones/Run')
%}

//analizador lexico

//directiva lex
%lex

%options case-insensitive

%%
//palabras reservadas
"int"                   return 'INT'
"double"                return 'DOUBLE'
"string"                return 'STRING'
"print"                 return 'TKPRINT'
"if"                    return 'IF'
"false"                 return 'FALSE'
"true"                  return 'TRUE'
"bool"                  return 'BOOL'
"while"                 return 'WHILE'
"run"                   return 'RUN'
"void"                  return 'VOID'
//simbolos del sistema
";"                     return 'PUNTOCOMA'
"+"                     return 'MAS'
"("                     return 'PAR1'
")"                     return 'PAR2'
"="                     return 'IGUAL'
"{"                     return 'LLAVE1'
"}"                     return 'LLAVE2'
"<"                     return 'MENOR'
","                     return 'COMA'
[0-9]+"."[0-9]+         return 'DECIMAL'
[0-9]+                  return 'ENTERO'
[\"][^\"]*[\"]          {yytext = yytext.substring(1,yyleng-1); return "CADENA"}
[a-z][a-z0-9_]*         return 'ID'

//espacios en blanco
[\ \r\t\f]              {};
[\ \n]                  {};

//fin de cadena
<<EOF>>                 return 'EOF'


%{
    //codigo JS 
%}

//directiva lex
/lex

//precencias
%left 'MENOR'
%left 'MAS'

//simbolo inicial
%start INICIO

%%

INICIO : INSTRUCCIONES EOF                  {return $1;}
;

INSTRUCCIONES : INSTRUCCIONES INSTRUCCION   {$1.push($2); $$ = $1;}
              | INSTRUCCION                 {$$ = [$1];}
;

INSTRUCCION : IMPRESION PUNTOCOMA     {$$ = $1;}
            | DECLARACION PUNTOCOMA   {$$ = $1;}
            | ASIGNACION PUNTOCOMA    {$$ = $1;}
            | SIF                     {$$ = $1;}
            | SWHILE                  {$$ = $1;}
            | METODO                  {$$ = $1;}
            | EJECUTAR PUNTOCOMA      {$$ = $1;}
            | LLAMADA PUNTOCOMA       {$$ = $1;}
;

IMPRESION : TKPRINT PAR1 EXPRESION PAR2 {$$ = new Print.default($3, @1.first_line, @1.first_column)}
;


DECLARACION : TIPOS ID IGUAL EXPRESION  {$$ = new Declaracion.default($1, @1.first_line, @1.first_column, $2, $4);}
;

ASIGNACION : ID IGUAL EXPRESION   {$$ = new AsignacionVar.default($1, $3, @1.first_line, @1.first_column );}
;

SIF : IF PAR1 EXPRESION PAR2 LLAVE1 INSTRUCCIONES LLAVE2    {$$ = new If.default($3, $6, @1.first_line, @1.first_column);}
;

SWHILE : WHILE PAR1 EXPRESION PAR2 LLAVE1 INSTRUCCIONES LLAVE2  {$$ = new While.default($3, $6, @1.first_line, @1.first_column );}
;

METODO : VOID ID PAR1 PARAMS PAR2 LLAVE1 INSTRUCCIONES LLAVE2   {$$ = new Metodo.default(new Tipo.default(Tipo.tipoDato.VOID), $2, $4, $7, @1.first_line, @1.first_column);}
       | VOID ID PAR1 PAR2 LLAVE1 INSTRUCCIONES LLAVE2          {$$ = new Metodo.default(new Tipo.default(Tipo.tipoDato.VOID), $2, [], $6, @1.first_line, @1.first_column);}
;                                                               

PARAMS : PARAMS COMA PARAM    {$1.push($3); $$ = $1;}
       | PARAM                {$$ = [$1];}
;

PARAM : TIPOS ID IGUAL EXPRESION    {$$ = {tipo:$1, id:$2, valor:$4};}
      | TIPOS ID                    {$$ = {tipo:$1, id:$2, valor:null};}
;


EJECUTAR : RUN ID PAR1 PARAMSCALL PAR2    {$$ = new Run.default($2, $4, @1.first_line, @1.first_column);}
         | RUN ID PAR1 PAR2               {$$ = new Run.default($2, [], @1.first_line, @1.first_column);}
;

LLAMADA : ID PAR1 PARAMSCALL PAR2     {$$ = new Llamada.default($1, $3, @1.first_line, @1.first_column);}
        | ID PAR1 PAR2                {$$ = new Llamada.default($1, [], @1.first_line, @1.first_column);}
;

PARAMSCALL : PARAMSCALL COMA PARAMCALL    {$1.push($3); $$ = $1;}
           | PARAMCALL                    {$$ = [$1];}
;

PARAMCALL : ID IGUAL EXPRESION  {$$ = {id:$1, valor:$3};}
;



EXPRESION : EXPRESION MAS EXPRESION   {$$ = new Aritmeticas.default(Aritmeticas.Operadores.SUMA,@1.first_line, @1.first_column,$1,$3);}
          | EXPRESION MENOR EXPRESION {$$ = new Relacionales.default(Relacionales.Relacional.MENOR, $1, $3, @1.first_line, @1.first_column );}
          | PAR1 EXPRESION PAR2       {$$ = $2;}
          | ID                        {$$ = new AccesoVar.default($1, @1.first_line, @1.first_column);}
          | ENTERO                    {$$ = new Nativo.default(new Tipo.default(Tipo.tipoDato.ENTERO), $1,@1.first_line, @1.first_column);}
          | DECIMAL                   {$$ = new Nativo.default(new Tipo.default(Tipo.tipoDato.DECIMAL), $1,@1.first_line, @1.first_column);}
          | CADENA                    {$$ = new Nativo.default(new Tipo.default(Tipo.tipoDato.STRING), $1,@1.first_line, @1.first_column);}
          | TRUE                      {$$ = new Nativo.default(new Tipo.default(Tipo.tipoDato.BOOL), true,@1.first_line, @1.first_column);}
          | FALSE                     {$$ = new Nativo.default(new Tipo.default(Tipo.tipoDato.BOOL), false,@1.first_line, @1.first_column);}
;

TIPOS : INT       {$$=new Tipo.default(Tipo.tipoDato.ENTERO);}
      | DOUBLE    {$$=new Tipo.default(Tipo.tipoDato.DECIMAL);}
      | STRING    {$$=new Tipo.default(Tipo.tipoDato.STRING);}
      | BOOL      {$$=new Tipo.default(Tipo.tipoDato.BOOL);}
;