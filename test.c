#include <stdio.h>

int main(int argc,char* argv[]){
  char s[8];
  fprintf(stdin,"%s","aquatan");
  fscanf(stdin,"%s",s);
  printf("%s",s);
  return 0;
}