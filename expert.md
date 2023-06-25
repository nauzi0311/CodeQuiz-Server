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

```c
#include <stdio.h>

//compile without -O option

void hoge(){
  printf("hoge");
  fflush(stdout);
}

void piyo(){
  printf("piyo\n");
  void *p;
  *((&p) + 2) = &hoge;
}

int main(){
  piyo();
  return 0;
}
```

```c
#include <stdio.h>

//compile without -O option

char check[] = "check";

void piyo(char* str){
  void* p;
  *((&p) + 3) = check;
  printf("%s\n", str);
}

int main(){
  char str[] = "aquatan";
  piyo(str);
  return 0;
}
```
