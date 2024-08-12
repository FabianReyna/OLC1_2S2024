package analisis;

//importaciones
import java_cup.runtime.Symbol;
import java.util.LinkedList;
%%

//codigo de usuario
%{
    public LinkedList<Errores> listaErrores = new LinkedList<Errores>();
    String cadena = "";
%}

%init{
    yyline = 1;
    yycolumn = 1;
    listaErrores = new LinkedList<>();
%init}

//caracteristicas de jflex
%cup
%class scanner
%public
%line
%column
%char
%full
//%debug

//creacion de estados
%state CADENA

//simbolos
FINCADENA = ";"
MULT = "*"
DIV = "/"
MAS = "+"
MENOS = "-"
PAR1 = "("
PAR2 = ")"
PUNTO = "."
BLANCOS = [\ \r\t\f\n]+
NUMEROS = [0-9]+("."[0-9]+)? // aceptamos enteros y decimales

// palabras reservadas
TKCONSOLE = "console"
TKLOG = "log"

%%

<YYINITIAL> {TKCONSOLE} {return new Symbol(sym.TKCONSOLE,yyline,yycolumn,yytext());}
<YYINITIAL> {TKLOG} {return new Symbol(sym.TKLOG,yyline,yycolumn,yytext());}
<YYINITIAL> {NUMEROS} {return new Symbol(sym.NUMEROS,yyline,yycolumn,yytext());}
<YYINITIAL> {PUNTO} {return new Symbol(sym.PUNTO,yyline,yycolumn,yytext());}
<YYINITIAL> {FINCADENA} {return new Symbol(sym.FINCADENA,yyline,yycolumn,yytext());}
<YYINITIAL> {MULT} {return new Symbol(sym.MULT,yyline,yycolumn,yytext());}
<YYINITIAL> {DIV} {return new Symbol(sym.DIV,yyline,yycolumn,yytext());}
<YYINITIAL> {MAS} {return new Symbol(sym.MAS,yyline,yycolumn,yytext());}
<YYINITIAL> {MENOS} {return new Symbol(sym.MENOS,yyline,yycolumn,yytext());}
<YYINITIAL> {PAR1} {return new Symbol(sym.PAR1,yyline,yycolumn,yytext());}
<YYINITIAL> {PAR2} {return new Symbol(sym.PAR2,yyline,yycolumn,yytext());}
<YYINITIAL> {BLANCOS} {}

// <! \n !>
// "asdasdasd"

<YYINITIAL> [\"] {yybegin(CADENA);cadena ="";}

<CADENA> {
    [\"]    {String tmp = cadena; cadena =""; yybegin(YYINITIAL);
            return new Symbol(sym.CADENA, yyline, yycolumn, tmp);}
    [^\"]   {cadena+=yytext();}
}

<YYINITIAL> . {listaErrores.add(new Errores("Lexico",
                "El caracter "+yytext()+" No pertenece al lenguaje",
                yyline, yycolumn));
}