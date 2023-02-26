#include <cs50.h>
#include <string.h>
#include <stdio.h>
#include <ctype.h>
#include <unistd.h>
#include <stdlib.h>


void swap(int *a, int *b)
{
    printf("*a: %i,   a: %p,   &a: %p\n", *a, a, &a);
    int tmp = *a; // tmp = 1
    *a = *b; // x的位址的值 = 2
    *b = tmp; // y的位址的值 = 1
}
void fn1()
{
    int x = 1;
    int y = 2;

    printf("1: %p & %p --> %i & %i\n", &x, &y, x, y);
    swap(&x, &y);
    printf("2: %p & %p --> %i & %i\n", &x, &y, x, y);
}

void fn2()
{
    char s1[3] = "abc";
    char *t1 = s1;

    t1[0] = toupper(t1[0]);

    printf("1.\ns: %s  %p\n", s1, s1);
    printf("t: %s  %p\n", t1, t1);


    string s2 = get_string("ha:");
    string t2 = s2;

    t2[0] = toupper(t2[0]);
    
    printf("2.\ns: %s  %p\n", s2, s2);
    printf("t: %s  %p\n", t2, t2);
}

void fn3()
{
      // int u = 3;
    int n1 = 5;
    int *p0 = &n1;
    int **p1 = &p0;
    printf("&p1: %p (%lu bytes),\n", &p1, sizeof(&p1));
    printf("p1: %p | &p0: %p (%lu bytes)\n",p1, &p0, sizeof(p1));
    printf("*p1: %p | &n1: %p (%lu bytes)\n", *p1, &n1, sizeof(*p1));
    printf("**p1: %i | n1: %i (%lu bytes)\n",  **p1, n1,  sizeof(**p1));
    // printf("&u: %p , &p1: %p , fake p1: %p , fake *p1: %d\n", &u, &p1, p1, *p1);
    // printf("&p1: %p (%lu bytes),\n p1: %p (%lu bytes) &p0: %p,\n *p1: %p (%lu bytes) &n1: %p,\n **p1: %d (%lu bytes) n1: %d\n", &p1, sizeof(&p1), p1, sizeof(p1), &p0, *p1, sizeof(*p1), &n1, &n1, **p1, sizeof(**p1), n1);

    // printf("&u: %p , &p1: %p\n", &u, &p1);
    // p1 = &u;
    // printf("&u: %p , &p1: %p (%lu bytes) , p1: %p (%lu bytes) , *p1: %d (%lu bytes)\n", &u, &p1, sizeof(&p1), p1, sizeof(p1), *p1, sizeof(*p1));

    // int *p2 = &u;
    // printf("&u: %p , &p2: %p , p2: %p , *p2: %d\n", &u, &p2, p2, *p2);
}

void fn4()
{
  char* s5 = get_string("s5:");
  char* t5 = get_string("t5:");

  printf("s5: %s: %p\n", s5, s5);     // s5: abc: 0x7ff3f6004080
  printf("t5: %s: %p\n", t5, t5);     // t5: abc: 0x7ff3f60040a0

  //
  char s1[] = "abc";
  char t1[] = "abc";
  
  printf("1.\nt1: %s: %p\n", t1, t1); // t1: abc: 0x7ff7b345c1c8
  
  t1[0] = 'b';

  printf("s1: %s: %p\n", s1, s1);     // s1: abc: 0x7ff7b345c1cc
  printf("t1: %s: %p\n", t1, t1);     // t1: bbc: 0x7ff7b345c1c8

  //
  char* s2 = "abc";
  char* t2 = "abc";
  
  printf("2.\nt2: %s: %p\n", t2, t2); // t2: abc: 0x10caa6f5d

  t2 = "dfg";

  printf("s2: %s: %p\n", s2, s2);     // s2: abc: 0x10caa6f5d
  printf("t2: %s: %p\n", t2, t2);     // t2: dfg: 0x10caa6f70

  //
  string s3 = "abc";
  string t3 = "abc";
  
  printf("3.\nt3: %s: %p\n", t3, t3); // t3: abc: 0x10caa6f5d
  
  t3 = "dfg";

  printf("s3: %s: %p\n", s3, s3);     // s3: abc: 0x10caa6f5d
  printf("t3: %s: %p\n", t3, t3);     // t3: dfg: 0x10caa6f70
}

void fn5()
{

  typedef struct node {
    int data;
    struct node *next;
  } Node;

  Node *n1 = malloc(sizeof(Node));
  n1->data = 5;
  printf("%i\n", n1->data);

}




int main(void)
{
  // // swap
  // fn1();
  
  // // char *
  // fn2();

  // // int *
  // fn3();

  // // string
  // fn4();

  // struct
  fn5();

  return 0;
}