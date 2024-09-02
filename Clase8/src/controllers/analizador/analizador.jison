%{
  //codigo JS
  const Tipo = require('./simbolo/Tipo')
  const Nativo = require('./expresiones/Nativo')
  const Aritmeticas = require('./expresiones/Aritmeticas') 
%}

//analizador lexico

//directiva lex
%lex

%options case-insensitive

%%
//palabras reservadas

//simbolos del sistema
";"                     return 'PUNTOCOMA'
"+"                     return 'MAS'
"("                     return 'PAR1'
")"                     return 'PAR2'
[0-9]+"."[0-9]+         return 'DECIMAL'
[0-9]+                  return 'ENTERO'

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

INSTRUCCION : EXPRESION PUNTOCOMA   {$$ = $1;}
;

EXPRESION : EXPRESION MAS EXPRESION   {$$ = new Aritmeticas.default(Aritmeticas.Operadores.SUMA,@1.first_line, @1.first_column,$1,$3);}
          | PAR1 EXPRESION PAR2       {$$ = $2;}
          | ENTERO                    {$$ = new Nativo.default(new Tipo.default(Tipo.tipoDato.ENTERO), $1,@1.first_line, @1.first_column);}
          | DECIMAL                   {$$ = new Nativo.default(new Tipo.default(Tipo.tipoDato.DECIMAL), $1,@1.first_line, @1.first_column);}
;
