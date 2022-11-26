#include <cs50.h>
#include <string.h>
#include <stdio.h>
#include <ctype.h>

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



int main(void)
{
  // // swap
  // fn1();
  
  // // char *
  // fn2();

  // // int *
  // fn3();
  // char ss[] = "asd";
  // printf("%s\n", ss);

  char s[] = "abc";
  char t[] = "abc";
  
  printf("%s: %p\n", t, t);
  
  t[0] = 'b';

  printf("%s: %p\n", s, s);
  printf("%s: %p\n", t, t);

  return 0;
}