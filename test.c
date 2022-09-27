#include <stdio.h>
#include <stdlib.h>

typedef struct node{
    int num;
    struct node* left;
    struct node* right;
}NODE;

void insert(NODE**,int);

void inorder(NODE* q){
  if(q!=NULL){
    inorder(q->left);
    printf("%d ",q->num);
    inorder(q->right);
  }
  return;
}

int main(){
  int i,data[10] = {81,4,62,95,21,16,84,3,40,91};
  NODE* root = NULL;
  for(i = 0;i < 10;i++){
    insert(&root,data[i]);
  }
  inorder(root);
  return 0;
}

void insert(NODE** p,int data){
  if(*p == NULL){
    *p = (NODE*)malloc(sizeof(NODE));
    (*p)->num = data;
    (*p)->left = NULL;
    (*p)->right = NULL;
    return;
  }else{
    if((*p)->num > data){
      insert(&((*p)->left),data);
    }else{
      insert(&((*p)->right),data);
    }  
  }
}


NODE* search(NODE* root,int number);
void delete(NODE*,int);

NODE* search(NODE* root,int number){
  NODE* node;
  node = root;
  if(number < node->num) {
    node = node->left;
  }else if(number > node->num){
    node = node->right;
  }else{
    return node;
  }
}

void delete(NODE* root,int number){
  NODE* target,*parent;
  target = search(root,number);
  if(target != NULL){
    for(parent = root;;){
      if((parent->left == target) || (parent->right == target)) break;
      if(parent->num > target->num){
        parent = parent->left;
      }else{
        parent = parent->right;
      }
    }
    if(parent->left == target){
      parent->left = NULL;
    }else{
      parent->right = NULL;
    }
    free(target);
  }else{
    printf("cannot delete");
  }
}