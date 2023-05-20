#include <stdio.h>
#include <stdlib.h>

typedef struct data DATA;
struct data{
  int number;
  float point;
  DATA* left;
  DATA* right;
};

int main()
{
  DATA* p;
  p = ???;
  free(p);
  return 0;
}
