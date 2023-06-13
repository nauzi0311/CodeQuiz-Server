#include <stdio.h>
#define SIZE(list) (sizeof(list)/sizeof(list[0]))

int main(int argc, char const *argv[])
{
  int i,j,k,l[] = {2,0,2,3};
  for(i = 1;i < SIZE(l);i++){
    if(l[i-1] > l[i]){
      for(j = 0;j < i;j++){
        if(l[j] > l[i]){
          int target = l[i];
          for(k = i;j < k;k--){
            l[k] = l[k-1];
          }
          l[j] = target;
        }
      }
    }
  }

  for (i = 0; i < SIZE(l); i++){
    printf("%d",l[i]);
  }
  
  return 0;
}
