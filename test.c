#include <stdio.h>
int x = 10;
void func(int *px){
  x += 10;
  *px += 10;
}
int main(){
  int x = 100;
  func(&x);
  printf("%d",x);
  return 0;
}