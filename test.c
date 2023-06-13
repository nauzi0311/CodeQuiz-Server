#include <stdio.h>
#include <stdlib.h>

typedef struct data{
  int id;
  char name[50];
}DATA;

void Print(DATA _d){
  printf("id: %d\
  name: %s", 
  _d.id,_d.name);
}

int main()
{
  DATA a = { 2000,"Job" };
  Print(a);
  return 0;
}
