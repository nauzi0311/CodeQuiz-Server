#define STRCAT(a,b) a##b
#include <stdio.h>

int f1(int a,int b){
  return a + b;
}

int f2(int a,int b){
  return a - b;
}

int main(int argc,char* argv[]){
  printf("%d",STRCAT(???)(20,10));
  return 0;
}
