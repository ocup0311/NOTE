#include <stdio.h>
#include <string.h>
#include <math.h>
#include <cs50.h>

// declare
int count_letter(string text);
int count_word(string text);
int count_sentence(string text);

// main
int main(void)
{
    string text = get_string("Text:");

    int nofWords = count_word(text);
    int nofLetters = count_letter(text);
    int nofSentences = count_sentence(text);

    float L = (float)nofLetters * 100 / (float)nofWords;
    float S = (float)nofSentences * 100 / (float)nofWords;
    int index = round(0.0588 * L - 0.296 * S - 15.8);
    
    if(index < 1) printf("Before Grade 1\n");
    else if(index >= 16) printf("Grade 16+\n");
    else printf("Grade %i\n", index);

    return 0;
}


// function
int count_letter(string text){
    // CONST
    int A = 65, Z = 90, a = 97, z = 122;

    // var
    int n = 0;
    
    // run
    for(int i = 0; i < strlen(text); i++)
    {
        int charCode = (int) text[i];

        if((charCode >= A && charCode <= Z) || (charCode >= a && charCode <= z)) n++;
    }

    return n;
}

int count_word(string text){
    // CONST
    int SPACE = 32;

    // var
    int n = 1;

    // run
    for(int i = 0; i < strlen(text); i++)
    {
        int charCode = (int) text[i];

        if(charCode == SPACE) n++;
    }

    return n;
}

int count_sentence(string text){
    // CONST
    int PERIOD = 46, QUESTTION = 63, EXCLAMATION = 33;

    // var
    int n = 0;

    // run
    for(int i = 0; i < strlen(text); i++)
    {
        int charCode = (int) text[i];

        if(charCode == PERIOD || charCode == QUESTTION || charCode == EXCLAMATION) n++;
    }

    return n;
}
