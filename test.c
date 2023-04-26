#include <stdio.h>

int main()
{
  int list[3][3] = {
    {0,0,0},
    {0,0,0},
    {0,0,0}
  };
  int i,j;
  for(i = 0;i < 2;i++){
    for(j = 0;j < 2;j++){
      int value = list[i][j];
      list[i + 1][j] = value + 1;
      list??? = value + 1;
      list[i][j + 1] = value + 1;
    }
  }
  for(i = 0; i < 3; i++){
    for(j = 0; j < 3; j++){
      printf("%d ",list[i][j]);
    }
    printf("\n");
  }
}
