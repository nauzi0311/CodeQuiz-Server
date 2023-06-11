#include <stdio.h>
#include <stdlib.h>

typedef struct data DATA;
struct data{
  int number;
  float point;
  DATA* left;
  DATA* right;
};

void output(DATA*);
DATA* findMin(DATA*);
DATA* delete(DATA*,DATA*);

int main()
{
  DATA d2 = {
    2,20,NULL,NULL
  },d1 = {
    1,10,NULL,&d2
  },d4 = {
    4,40,NULL,NULL
  },d5 = {
    5,50,&d4,NULL
  },d3 = {
    3,30,&d1,&d5
  },*head = &d3;
  delete(head,&d5);
  output(head);
  return 0;
}

DATA* findMin(DATA* node){
  DATA* tmp = node;
  while(tmp && tmp->left != NULL){
    tmp = tmp->left;
  }
  return tmp;
}

DATA* delete(DATA* node,DATA* target){
  if(node == NULL){
    return node;
  }

  if(target->number < node->number){
    node->left = delete(node->left,target);
  }else if(target->number > node->number){
    node->right = delete(node->right,target);
  }else{
    if(node != target){
      node->right = delete(node->right,target);
    }
    if(node->left == NULL){
      return node->right;
    }else if(node->right == NULL){
      return node->left;
    }else{
      DATA* minNode = findMin(node->right);
      *node = *minNode;
      node->right = delete(node->right,minNode);
    }
  }
  return node;
}

void output(DATA* node){
  if(node == NULL)return;
  output(node->left);
  printf("%d  ",node->number);
  output(node->right);
}
