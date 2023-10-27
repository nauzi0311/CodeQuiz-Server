#include <stdio.h>

void func(int a,???);

int main(){
  func(10,20);
  return 0;
}

void func(int a,int b){
  printf("%d",a+b);
}