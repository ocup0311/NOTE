#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <math.h>
#include <cs50.h>
#include <ctype.h>


// CONST
int A = 65, Z = 90, a = 97, z = 122;

// declare
bool isNumKey(string key);
int convert_code(int preCode, int key);

// main
int main(int n, string p[])
{
    // exception
    if(n != 2)
    {
        printf("Need only one Key!\n");
        return 1;
    }

    if(!isNumKey(p[1]))
    {
        printf("Usage: ./caesar <KEY>\n");
        return 1;
    }

    // var
    string text = get_string("plaintext: ");
    int key = atoi(p[1]);

    // run
    for(int i = 0; i < strlen(text); i++)
    {
        int preCode = (int) text[i];
        int newCode = convert_code(preCode, key);
        char newChar = newCode;
        text[i] = newChar;
    }

    printf("ciphertext: %s\n", text);
 
    return 0;
}

// function
bool isNumKey(string key)
{
    for(int i = 0; i < strlen(key); i++)
    {
        if(!isdigit(key[i])) return false;
    }

    return true;
}

int convert_code_by_datas(int preCode, int key, int rows, int datas[rows][2])
{
    for(int i = 0; i < rows; i++)
    {
        int S = datas[i][0];
        int E = datas[i][1];

        if(preCode >= S && preCode <= E)
        {
            return (preCode - S + key) % 26 + S;
        }
    }

    return preCode;
}

int convert_code(int preCode, int key)
{
    int datas[2][2] = { { A , Z } , { a , z } };
    int rows = sizeof(datas) / sizeof(datas[0]);

    return convert_code_by_datas(preCode, key, rows, datas);
}
