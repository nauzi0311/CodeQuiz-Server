#include <stdio.h>

void func(char* string){
  int i;
  for(i = 0;i < 7;i++){
    string[i] += ???;
  }
}

int main(){
  char str[] = "aquatan";
  func(str);
  printf("%s",str);
  return 0;
}