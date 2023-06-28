#include <stdio.h>
#define SIZE(list) (sizeof(list)/sizeof(list[0]))

void func(int list[]){
  list[0]++;
}

int main(){
  int i,aquatan[] = {2,0,2,3};
  func(aquatan);
  for(i = 0; i < SIZE(aquatan); i++){
    printf("%d",aquatan[i]);
  }
  return 0;
}