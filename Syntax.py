import re

CType = {
    "int ":"<color=#358cd6>int</color> ",
    "float ":"<color=#358cd6>float</color> ",
    "double ":"<color=#358cd6>double</color> ",
    "char ":"<color=#358cd6>char</color> ",
    "enum ":"<color=#358cd6>enum</color> ",
    "extern ":"<color=#358cd6>extern</color> ",
    "long ":"<color=#358cd6>long</color> ",
    "register ":"<color=#358cd6>register</color> ",
    "signed ":"<color=#358cd6>signed</color> ",
    "unsigned ":"<color=#358cd6>unsigned</color> ",
    "short ":"<color=#358cd6>short</color> ",
    "static ":"<color=#358cd6>static</color> ",
    "struct ":"<color=#358cd6>struct</color> ",
    "union ":"<color=#358cd6>union</color> ",
    "void ":"<color=#358cd6>void</color> ",
    "auto ":"<color=#358cd6>auto</color> ",
    "const ":"<color=#358cd6>const</color> ",
    "volatile ":"<color=#358cd6>volatile</color> ",
    "int* ":"<color=#358cd6>int</color>* ",
    "float* ":"<color=#358cd6>float</color>* ",
    "double* ":"<color=#358cd6>double</color>* ",
    "char* ":"<color=#358cd6>char</color>* ",
    "enum* ":"<color=#358cd6>enum</color>* ",
    "long* ":"<color=#358cd6>long</color>* ",
    "register* ":"<color=#358cd6>register</color>* ",
    "short* ":"<color=#358cd6>short</color>* ",
    "struct* ":"<color=#358cd6>struct</color>* ",
    "union* ":"<color=#358cd6>union</color>* ",
    "void* ":"<color=#358cd6>void</color>* "
}

CControl = {
    "break":"<color=#c586c0>break</color>", 
    "continue":"<color=#c586c0>continue</color>", 
    "case":"<color=#c586c0>case</color>", 
    "default":"<color=#c586c0>default</color>", 
    "do":"<color=#c586c0>do</color>", 
    "else":"<color=#c586c0>else</color>", 
    "for":"<color=#c586c0>for</color>", 
    "goto":"<color=#c586c0>goto</color>", 
    "if":"<color=#c586c0>if</color>", 
    "return":"<color=#c586c0>return</color>", 
    "switch":"<color=#c586c0>switch</color>", 
    "typedef":"<color=#c586c0>typedef</color>", 
    "while":"<color=#c586c0>while</color>",
    "return":"<color=#c586c0>return</color>"
}

CBracket ={
    "(":"<color=#ffd700>(</color>",
    ")":"<color=#ffd700>)</color>",
    "{":"<color=#ffd700>{</color>",
    "}":"<color=#ffd700>}</color>",
    "[":"<color=#ffd700>[</color>",
    "]":"<color=#ffd700>]</color>",
}

f = open('test.c')
source = f.read()
print(source)
source = re.sub('(\'.*?\')',r'<color=#ce9178>\1</color>',source)
source = re.sub('(\".*?\")',r'<color=#ce9178>\1</color>',source)
source = re.sub('(#include) ([<"].*?[>"])',r'<color=#da70d6>\1</color> <color=#ce9178>\2</color>',source)
source = re.sub('(#define) (.*?)\n',r'<color=#da70d6>\1</color> <color=#ce9178>\2</color>\n',source)
# source = re.sub('(#include)',r'<color=#da70d6>\1</color>',source)

for key_type in CType.keys():
    source = source.replace(key_type,CType[key_type])

for key_control in CControl.keys():
    source = source.replace(key_control,CControl[key_control])

for key_bracket in CBracket.keys():
    source = source.replace(key_bracket,CBracket[key_bracket])

print("Preview:\n" + source)
source = source .replace('\n',"\\n")
source = source .replace('\t',"\\t")
source = source .replace('\"',"\\\"")
print("JSON:\n" + source)
