import sys,json
import Desyntax,Syntax

src = Desyntax.main(sys.argv[1],sys.argv[2])
with open("./test.c","w",encoding="utf-8") as f:
    f.write(src)
src = Syntax.main()