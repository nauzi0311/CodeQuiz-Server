#include <stdio.h>
#define SIZE(list) (sizeof(list)/sizeof(list[0]))

int main(int argc, char const *argv[])
{
  int i,j,k,aquatan[] = {2,0,2,3};
  for(i = 1;i < SIZE(aquatan);i++){
    if(aquatan[i-1] > aquatan[i]){
      for(j = 0;j < i;j++){
        if(aquatan[j] > aquatan[i]){
          int target = aquatan[i];
          for(k = i;j < k;k--){
            aquatan[k] = aquatan[k-1];
          }
          aquatan[j] = target;
        }
      }
    }
  }
  for (i = 0; i < SIZE(aquatan); i++){
    printf("%d",aquatan[i]);
  }
  
  return 0;
}
