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
void merge(pair arr[], int l, int m, int r)
{
    int i, j, k;
    int n1 = m - l + 1;
    int n2 = r - m;
    pair L[n1], R[n2];

    for (i = 0; i < n1; i++) L[i] = arr[l + i];
    for (j = 0; j < n2; j++) R[j] = arr[m + 1 + j];

    i = 0; // Initial index of first subarray
    j = 0; // Initial index of second subarray
    k = l; // Initial index of merged subarray
    while (i < n1 && j < n2) 
    {
        int x = preferences[L[i].winner][L[i].loser];
        int y = preferences[R[j].winner][R[j].loser];
        if (x <= y) 
        {
            arr[k] = L[i];
            i++;
        }
        else 
        {
            arr[k] = R[j];
            j++;
        }
        k++;
    }
    while (i < n1) 
    {
        arr[k] = L[i];
        i++;
        k++;
    }
    while (j < n2) 
    {
        arr[k] = R[j];
        j++;
        k++;
    }
}

void sort(pair arr[], int l, int r)
{
    if (l < r) 
    {
        int m = l + (r - l) / 2;

        sort(arr, l, m);
        sort(arr, m + 1, r);

        merge(arr, l, m, r);
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