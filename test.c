#include <stdio.h>
#include <stdlib.h>

typedef struct data{
  int number;
  float point;
}DATA;

int main()
{
  DATA d = {2,20.0};
  DATA *p = &d;
  printf("%f",p->point);
  return 0;
}
