#define DEBUG 1
#define ADD(a,b) a+b
#include <stdio.h>

#if DEBUG == 0
int main(int argc,char* argv[]){
  int x = 3,y = 4;
  printf("%d",2*ADD(x,y));
  return 0;
}
#endif

#if DEBUG == 1
int main(int argc,char* argv[]){
  int x = 3,y = 4;
  printf("%d%d%d",x,y,ADD(x,y));
  return 0;
}
#endif