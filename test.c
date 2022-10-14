#include <stdio.h>

int main(){
  int x;
  x = 8;
  switch (x)
  {
  case 2:
    printf("2");
  case 4:
    printf("4");
  case 6:
    printf("6");
  case 8:
    printf("8");
  case 10:
    printf("10");
    break;
  default:
    printf("default");
    break;
  }

  return 0;
}