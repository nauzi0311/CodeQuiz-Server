#include <stdio.h>
int main(){
  long long ll = 2e9;
  long long *pll = &ll;
  printf("%d",*pll);
  return 0;
}