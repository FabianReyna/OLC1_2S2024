%{
  //codigo JS
  const Tipo = require('./simbolo/Tipo')
  const Nativo = require('./expresiones/Nativo')
  const Aritmeticas = require('./expresiones/Aritmeticas')
  const AccesoVar = require('./expresiones/AccesoVar') 

  const Declaracion = require('./instrucciones/Declaracion')
  const AsignacionVar = require('./instrucciones/AsignacionVar')
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
//simbolos del sistema
";"                     return 'PUNTOCOMA'
"+"                     return 'MAS'
"("                     return 'PAR1'
")"                     return 'PAR2'
"="                     return 'IGUAL'
[0-9]+"."[0-9]+         return 'DECIMAL'
[0-9]+                  return 'ENTERO'
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
%left 'MAS'

//simbolo inicial
%start INICIO

%%

INICIO : INSTRUCCIONES EOF                  {return $1;}
;

INSTRUCCIONES : INSTRUCCIONES INSTRUCCION   {$1.push($2); $$ = $1;}
              | INSTRUCCION                 {$$ = [$1];}
;

INSTRUCCION : DECLARACION PUNTOCOMA   {$$ = $1;}
            | ASIGNACION PUNTOCOMA    {$$ = $1;}
;

DECLARACION : TIPOS ID IGUAL EXPRESION  {$$ = new Declaracion.default($1, @1.first_line, @1.first_column, $2, $4);}
;

ASIGNACION : ID IGUAL EXPRESION   {$$ = new AsignacionVar.default($1, $3, @1.first_line, @1.first_column );}
;

EXPRESION : EXPRESION MAS EXPRESION   {$$ = new Aritmeticas.default(Aritmeticas.Operadores.SUMA,@1.first_line, @1.first_column,$1,$3);}
          | PAR1 EXPRESION PAR2       {$$ = $2;}
          | ID                        {$$ = new AccesoVar.default($1, @1.first_line, @1.first_column);}
          | ENTERO                    {$$ = new Nativo.default(new Tipo.default(Tipo.tipoDato.ENTERO), $1,@1.first_line, @1.first_column);}
          | DECIMAL                   {$$ = new Nativo.default(new Tipo.default(Tipo.tipoDato.DECIMAL), $1,@1.first_line, @1.first_column);}
;

TIPOS : INT       {$$=new Tipo.default(Tipo.tipoDato.ENTERO);}
      | DOUBLE    {$$=new Tipo.default(Tipo.tipoDato.DECIMAL);}
      | STRING    {$$=new Tipo.default(Tipo.tipoDato.STRING);}
;