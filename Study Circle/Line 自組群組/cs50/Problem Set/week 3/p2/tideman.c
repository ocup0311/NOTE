#include <cs50.h>
#include <string.h>
#include <stdio.h>

// Max number of candidates
#define MAX 9

// preferences[i][j] is number of voters who prefer i over j
int preferences[MAX][MAX];

// locked[i][j] means i is locked in over j
bool locked[MAX][MAX];

// Each pair has a winner, loser
typedef struct
{
    int winner;
    int loser;
}
pair;

// Array of candidates
string candidates[MAX];
pair pairs[MAX * (MAX - 1) / 2];

int pair_count;
int candidate_count;

// Function prototypes
bool vote(int rank, string name, int ranks[]);
void record_preferences(int ranks[]);
void add_pairs(void);
void sort_pairs(void);
void lock_pairs(void);
void print_winner(void);

int main(int argc, string argv[])
{
    // Check for invalid usage
    if (argc < 2)
    {
        printf("Usage: tideman [candidate ...]\n");
        return 1;
    }
    if (argc == 2) 
    {
        printf("%s\n", argv[1]);
        return 0;
    }
    candidate_count = argc - 1;
    if (candidate_count > MAX)
    {
        printf("Maximum number of candidates is %i\n", MAX);
        return 2;
    }
    for (int i = 0; i < candidate_count; i++)
    {
        candidates[i] = argv[i + 1];
    }

    // Clear graph of locked in pairs
    for (int i = 0; i < candidate_count; i++)
    {
        for (int j = 0; j < candidate_count; j++)
        {
            locked[i][j] = false;
            preferences[i][j] = 0;
        }
    }

    pair_count = 0;
    int voter_count = get_int("Number of voters: ");

    // Query for votes
    for (int i = 0; i < voter_count; i++)
    {
        // ranks[i] is voter's ith preference
        int ranks[candidate_count];

        // Query for each rank
        for (int j = 0; j < candidate_count; j++)
        {
            string name = get_string("Rank %i: ", j + 1);

            if (!vote(j, name, ranks))
            {
                printf("Invalid vote.\n");
                j--;
            }
        }

        record_preferences(ranks);

        printf("\n");
    }

    add_pairs();
    sort_pairs();
    lock_pairs();
    print_winner();
    return 0;
}

// Update ranks given a new vote
bool vote(int rank, string name, int ranks[])
{
    for (int i = 0; i < candidate_count; i++)
    {
        if(strcmp(candidates[i], name) == 0) 
        {
            for(int j = 0; j < rank; j++)
            {
                if(ranks[j] == i) return false;
            }

            ranks[rank] = i;
            return true;
        }
    }

    return false;
}

// Update preferences given one voter's ranks
void record_preferences(int ranks[])
{
    for(int i = 0; i < candidate_count; i++)
    {
        int winner = ranks[i];

        for(int j = i + 1; j < candidate_count; j++)
        {
            int loser = ranks[j];
            preferences[winner][loser]++;
        }
    }

    return;
}

// Record pairs of candidates where one is preferred over the other
void add_pairs(void)
{
    for(int i = 0; i < candidate_count; i++)
    {
        for(int j = i + 1; j < candidate_count; j++)
        {
            if(preferences[i][j] == preferences[j][i]) continue;

            bool isWinByI = preferences[i][j] > preferences[j][i];

            pairs[pair_count].winner = isWinByI ? i : j;
            pairs[pair_count].loser = isWinByI ? j : i; 

            pair_count++;
        }
    }

    return;
}

// Sort pairs in decreasing order by strength of victory
void merge(pair arr[], int idxS, int idxM, int idxE)
{
    int ptrL = 0; 
    int ptrR = 0; 
    int ptrM = idxS; 
    int len1 = idxM - idxS + 1;
    int len2 = idxE - idxM;

    pair arrL[len1], arrR[len2];
    for (int i = 0; i < len1; i++) arrL[i] = arr[idxS + i];
    for (int j = 0; j < len2; j++) arrR[j] = arr[idxM + 1 + j];

   
    while (ptrL < len1 && ptrR < len2) 
    {
        int keyL = preferences[arrL[ptrL].winner][arrL[ptrL].loser];
        int keyR = preferences[arrR[ptrR].winner][arrR[ptrR].loser];
        if (keyL >= keyR) 
        {
            arr[ptrM] = arrL[ptrL];
            ptrL++;
        }
        else 
        {
            arr[ptrM] = arrR[ptrR];
            ptrR++;
        }
        ptrM++;
    }
    while (ptrL < len1) 
    {
        arr[ptrM] = arrL[ptrL];
        ptrL++;
        ptrM++;
    }
    while (ptrR < len2) 
    {
        arr[ptrM] = arrR[ptrR];
        ptrR++;
        ptrM++;
    }
}

void sort(pair arr[], int idxS, int idxE)
{
    if (idxS < idxE) 
    {
        int idxM = idxS + (idxE - idxS) / 2;

        sort(arr, idxS, idxM);
        sort(arr, idxM + 1, idxE);

        merge(arr, idxS, idxM, idxE);
    }
}

void sort_pairs(void)
{
    sort(pairs, 0, pair_count - 1);

    return;
}

// Lock pairs into the candidate graph in order, without creating cycles
void lock_pairs(void)
{
    for(int i = 0; i < pair_count; i++)
    {
        int win = pairs[i].winner;
        int los = pairs[i].loser;
        int tmp = win;
        bool isCycle = false;

        for(int j = 0; j < candidate_count;)
        {
            if(locked[j][tmp])
            {
                if(j == los)
                {
                    isCycle = true;
                    break;
                } 

                tmp = j;
                j = 0;
                continue;
            }

            j++;
        }

        if(!isCycle) locked[win][los] = true;
    }

    return;
}

// Print the winner of the election
void print_winner(void)
{
    if(pair_count == 0)
    {
        for(int i = 0; i < candidate_count; i++)
        {
            printf("%s",candidates[i]);
        }
        return;
    }

    int win;

    for(int i = 0; i < candidate_count; i++)
    {
        if(win) break;

        for(int j = 0; j < candidate_count; j++)
        {
            if(win) break;
            if(locked[i][j]) win = i + 1;
        }
    }

    win--;

    if(win < 0) 
    {
        printf("There's no winner!\n");
        return;
    }
    
    for(int i = 0; i < candidate_count; i++)
    {
        if(locked[i][win]) 
        {
            win = i;
            i = 0;
        }
    }

    printf("%s\n", candidates[win]);

    return;
}