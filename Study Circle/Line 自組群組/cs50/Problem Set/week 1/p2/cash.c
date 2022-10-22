#include <stdio.h>
#include <math.h>
#include <cs50.h>

// declare
bool isInRange(int num, int min, int max);

// main
int main(void)
{
    int coins[4] = {25, 10, 5, 1};
    int amount = 0;
    float dollars;
    
    do 
    {
        dollars = get_float("Change owed: ");
    } 
    while (!isInRange(dollars, 0, INT_MAX));

    int cents = round(dollars * 100);
    int remainder = cents;

    for (int i = 0; i < 4; i++)
    {
        int quotient = remainder / coins[i];
        remainder = remainder - quotient * coins[i];
        amount = amount + quotient;
    }

    printf("%i\n", amount);
}

// function
bool isInRange(int num, int min, int max) 
{
    return num >= min && num <= max;
}
