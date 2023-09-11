#include <stdio.h>

typedef struct test{
  int x;
  char c;
}TEST;

int main(int argc,char* argv[]){
  TEST list[5] = {{1,'a'},{2,'b'},{3,'c'},{4,'d'},{5,'e'}};
  TEST *p;
  p = list;
  printf("%d",???);
  return 0;
}