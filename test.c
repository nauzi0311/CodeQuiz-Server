#include <stdio.h>
int main(){
  char list[][5] = {
    {'a','q','\0','b','x'},
    {'u','a','t','\0','y'},
    {'a','n','\0','w','z'},
  };
  int i;
  for(i = 0;i < 3;i++){
    printf("%s",list[i]);
  }
  return 0;
}