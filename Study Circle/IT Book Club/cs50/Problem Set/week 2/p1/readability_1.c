#include <stdio.h>
#include <string.h>
#include <math.h>
#include <cs50.h>

// declare
bool isLetter(int charCode);
bool isWord(int charCode);
bool isSentence(int charCode);

// main
int main(void)
{
    // var
    string text = get_string("Text:");
    int nofWords = 1;
    int nofLetters = 0;
    int nofSentences = 0;
    float L, S;
    int index;

    // run
    for(int i = 0; i < strlen(text); i++)
    {
        int charCode = (int) text[i];

        if(isLetter(charCode)) nofLetters++;
        else if(isWord(charCode)) nofWords++;
        else if(isSentence(charCode)) nofSentences++;
    }

    L = (float)nofLetters * 100 / (float)nofWords;
    S = (float)nofSentences * 100 / (float)nofWords;
    index = round(0.0588 * L - 0.296 * S - 15.8);
    
    if(index < 1) printf("Before Grade 1\n");
    else if(index >= 16) printf("Grade 16+\n");
    else printf("Grade %i\n", index);

    return 0;
}


// function
bool isLetter(int charCode){
    // CONST
    int A = 65, Z = 90, a = 97, z = 122;

    return (charCode >= A && charCode <= Z) || (charCode >= a && charCode <= z);
}

bool isWord(int charCode){
    // CONST
    int SPACE = 32;

    return charCode == SPACE;
}

bool isSentence(int charCode){
    // CONST
    int PERIOD = 46, QUESTTION = 63, EXCLAMATION = 33;

    return charCode == PERIOD || charCode == QUESTTION || charCode == EXCLAMATION;
}
