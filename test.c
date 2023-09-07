#include <stdio.h>
char func(char c){
  return ++c;
}
int main(){
  char x = 'a';
  x = func(x);
  printf("%c",x);
  return 0;
}