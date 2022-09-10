#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <math.h>
#include <cs50.h>

// CONST
int A = 65, Z = 90, a = 97, z = 122;

// main
int main(int n, string p[])
{
    // exception
    if(n != 2)
    {
        printf("Need only one Key!\n");
        return true;
    }

    // var
    int key = atoi(p[1]);
    string text = get_string("plaintext: ");

    // run
    for(int i = 0; i < strlen(text); i++)
    {
        int preCode = (int) text[i];
        int newCode = preCode;

        if(preCode >= A && preCode <= Z)
        {
            newCode = (preCode - A + key) % 26 + A;
        }
        else if(preCode >= a && preCode <= z)
        {
            newCode = (preCode - a + key) % 26 + a;
        }

        
        char newChar = newCode;
        text[i] = newChar;
    }

    printf("ciphertext: %s\n", text);
 
    return false;
}

