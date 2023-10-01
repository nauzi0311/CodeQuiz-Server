#include <stdio.h>
int main(){
  int list[] = {0,1,2};
  printf("%p\n",&list[1]);
  printf("%p\n",&list[2]);
  printf("%p\n",&list[3]);
  return 0;
}