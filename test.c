#include <stdio.h>
#include <stdlib.h>

int main()
{
  char **p;
  p = (char**)malloc(sizeof(char*)*2);
  p[0] = "hello";
  p[1] = "world";
  printf("%s %s",p[0],p[1]);
  return 0;
}
