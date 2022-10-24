#include <stdio.h>
#include <ctype.h>

int main(int argc,char* argv[]){
  int i = 1;
  i = i >> 1 << 1;
  printf("%d\n",i);
  return 0;
}