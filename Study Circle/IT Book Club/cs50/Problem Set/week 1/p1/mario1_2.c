#include <stdio.h>
#include <cs50.h>

// declare
void print_timesof_str(string str, int times);
bool isInRange(int num, int min, int max);

// main
int main(void) 
{
    int height;

    do 
    {
        height = get_int("Height: ");
    } 
    while (!isInRange(height, 1, 8));

    for (int i = 1; i <= height; i++) 
    {
        print_timesof_str(" ", height - i);
        print_timesof_str("#", i);
        printf("\n");
    }
}

// function
void print_timesof_str(string str, int times) 
{
    for (int i = 0; i < times; i++) 
    {
        printf("%s", str);
    }
}

bool isInRange(int num, int min, int max) 
{
    return num >= min && num <= max;
}
