#include <stdio.h>
#include <stdlib.h>

int add(int a,int b){
  return a + b;
}

int sub(int a,int b){
  return a - b;
}

int ???(int,int){
  return i == 0 ? add : sub;
}

int main()
{
  printf("%d",select(0)(5,3));
  return 0;
}