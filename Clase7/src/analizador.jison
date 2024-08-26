%{
 // Codigo de JS si fuese necesario
%}

// analizador Lexico

//directiva lex para realizar el analisis lexico
%lex

//case insensitive
%options case-insensitive

%%
"evaluar"           return 'TKEVALUAR'
"imprimir"          return 'TKIMPRIMIR'
"("                 return 'PAR1'
")"                 return 'PAR2'
";"                 return 'FINCADENA'
"+"                 return 'MAS'
"-"                 return 'MENOS'
[0-9]+              return 'ENTEROS'
[\"]([^\"\n])*[\"]  {yytext=yytext.substr(1,yyleng-2);
                    return 'CADENA';}

// espacios en blanco
[\ \r\t\f]          {};
[\ \n]              {};

<<EOF>>             return 'EOF'

%{
    //CODIGO DE JS SI FUERA NECESARIO
%}

// directiva lex para usar los tokens reconocidos en el lexico (arriba)
/lex

%left 'MAS' 'MENOS'
%right 'UMENOS'

//SIMBOLO INICIAL
%start INICIO

%%

INICIO : INSTRUCCIONES EOF
;

INSTRUCCIONES : INSTRUCCIONES INSTRUCCION
              | INSTRUCCION
;

INSTRUCCION : TKEVALUAR PAR1 EXPRESION PAR2 FINCADENA       {console.log($3);}
            | TKIMPRIMIR PAR1 CADENA PAR2 FINCADENA         {console.log($3);}
;

EXPRESION : EXPRESION MAS EXPRESION             {$$ = $1 + $3;}
          | EXPRESION MENOS EXPRESION           {$$ = $1 - $3;}
          | MENOS EXPRESION %prec UMENOS        {$$ = $2 * -1;}
          | ENTEROS                             {$$ = parseFloat($1);}
;