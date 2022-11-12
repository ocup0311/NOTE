#include <cs50.h>
#include <stdio.h>
#include <string.h>

// Max number of candidates
#define MAX 9

// Candidates have name and vote count
typedef struct
{
    string name;
    int votes;
}
candidate;

// Array of candidates
candidate candidates[MAX];

// Number of candidates
int candidate_count;

// Function prototypes
bool vote(string name);
void print_winner(void);

int main(int argc, string argv[])
{
    candidate_count = argc - 1;

    // exception
    if (argc < 2) 
    {
        printf("Usage: plurality [candidate ...]\n");
        return 1;
    }
    if (argc == 2) 
    {
        printf("winner:%s\n", argv[1]);
        return 0;
    }
    if (candidate_count > MAX)
    {
        printf("Maximum number of candidates is %i\n", MAX);
        return 2;
    }
    for (int i = 0; i < candidate_count; i++)
    {
        candidates[i].name = argv[i + 1];
        candidates[i].votes = 0;
    }

    // run
    int voter_count = get_int("Number of voters: ");

    for (int i = 0; i < voter_count; i++)
    {
        string name = get_string("Vote: ");

        // Check for invalid vote
        if (!vote(name))
        {
            printf("Invalid vote.\n");
            i--;
        }
    }

    print_winner();
}

// Update vote totals given a new vote
bool vote(string name)
{
    for (int i = 0; i < candidate_count; i++)
    {
        if(strcmp(candidates[i].name, name) == 0) 
        {
            candidates[i].votes++;
            return true;
        }
    }

    return false;
}

// Print the winner (or winners) of the election
void print_winner(void)
{
    int highest_votes = 0;
    int winner_count = 0;
    char *winners[candidate_count];

    for (int i = 0; i < candidate_count; i++)
    {
        if(candidates[i].votes > highest_votes)
        {
            winner_count = 1;
            highest_votes = candidates[i].votes;
            winners[0] = candidates[i].name;
        } 
        else if(candidates[i].votes == highest_votes)
        {
            winners[winner_count] = candidates[i].name;
            winner_count++;
        }
    }

    for (int i = 0; i < winner_count; i++)
    {
        printf("%s\n", winners[i]);
    }

    return;
}
