#include <stdio.h>
#include <string.h>
#include <math.h>
#include <cs50.h>

// declare
int count_letter(string text);
int count_word(string text);
int count_sentence(string text);
void print_grade(int index);

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
    
    print_grade(index);

    return 0;
}


// function
int count_from_text(string text, bool (*check)(int)){
    // var
    int n = 0;

    // run
    for(int i = 0; i < strlen(text); i++)
    {
        int charCode = (int) text[i];

        if(check(charCode)) n++;
    }

    return n;
}

bool check_letter(int charCode){
    int A = 65, Z = 90, a = 97, z = 122;
    return (charCode >= A && charCode <= Z) || (charCode >= a && charCode <= z);
}
int count_letter(string text){
    return count_from_text(text, check_letter);
}

bool check_word(int charCode){
    int SPACE = 32;
    return charCode == SPACE;
}
int count_word(string text){
    return count_from_text(text, check_word) + 1;
}

bool check_sentence(int charCode){
    int PERIOD = 46, QUESTTION = 63, EXCLAMATION = 33;
    return charCode == PERIOD || charCode == QUESTTION || charCode == EXCLAMATION;
}
int count_sentence(string text){
    return count_from_text(text, check_sentence);
}

void print_grade(int index){
    if(index < 1) printf("Before Grade 1\n");
    else if(index >= 16) printf("Grade 16+\n");
    else printf("Grade %i\n ", index);
}