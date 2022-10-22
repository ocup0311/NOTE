#include <stdio.h>
#include <cs50.h>

int main(void)
{
    // var
    bool isPass = false;
    int height;

    // run
    while (!isPass)
    {
        height = get_int("Height: ");

        if (height > 0 && height < 9) 
        {
            isPass = true;
        }
    }

    for (int i = 1; i <= height; i++)
    {
        for (int space = 1; space <= height - i; space++)
        {
            printf(" ");
        }

        for (int hash = height - i + 1; hash <= height; hash++)
        {
            printf("#");
        }

        printf("\n");
    }
}
