#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <math.h>
#include <cs50.h>

// CONST
int A = 65, Z = 90, a = 97, z = 122;

// declare
bool isValidKey(string key);

// main
int main(int n, string p[])
{
    
    // exception
    if(n != 2)
    {
        printf("Need only one Key!\n");
        return true;

    }

    string key = p[1];
    int KEY[52];

    if(isValidKey(key))
    {
        int diff = a - A;

        for(int i = 0; i < 26; i++)
        {
            int code = (int) key[i];
            KEY[i + 26] = code;
            KEY[i] = code + diff;
        }
    }
    else
    {
        printf("The key is not VALID! Need 26 unduplicated uppercase char.\n");
        return true;
    }

    // var
    string text = get_string("plaintext: ");

    // run
    for(int i = 0; i < strlen(text); i++)
    {
        int preCode = (int) text[i];
        int newCode = preCode;
        int index = -1;

        if(preCode >= A && preCode <= Z) index = preCode - A + 26;
        else if(preCode >= a && preCode <= z) index = preCode - a;
        
        if(index > 0) newCode = KEY[index];

        char newChar = newCode;
        text[i] = newChar;
    }

    printf("ciphertext: %s\n", text);
 
    return false;
}

// function
bool isValidKey(string key)
{
    if(strlen(key) != 26) return false;

    int store[26] = { 0 };

    for(int i = 0; i < 26; i++)
    {

        int code = (int) key[i];
        int index = code - A;

        if(!(code >= A && code <= Z)) return false;
        if(store[index] == 1) return false;

        store[index] = 1;
    }

    return true;
}
