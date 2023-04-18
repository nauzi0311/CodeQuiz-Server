```c
#include <stdio.h>

void func(char* list){
  printf("%d",sizeof(int));
  ((int*)list)[1] = 0;
}

int main(){
  char str[] = "aquatan";
  func(str);
  printf("%s", str);
  return 0;
}
```
