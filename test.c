#include <stdio.h>

void func(char* list){
  printf("%d\n",sizeof(int));
  ((int*)list)[1] = 0x74616e00;
}

int main(){
  char str[] = "aquaban";
  func(str);
  printf("%s", str);
  return 0;
}