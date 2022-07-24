// Luhn’s Algorithm
#include <stdio.h>
#include <cs50.h>

// declare
int get_part1_digit(long part);
int get_part2_digit(long part);

// main
int main(void)
{
    // const
    long CHECK_HEAD = 100000000000000;
    char *INVALID = "INVALID";

    // var
    long num = get_long("Number: ");
    long part1 = num / 10;
    long part2 = num;
    int head = num / CHECK_HEAD;
    int checksum = 0;
    char *type;

    // exception
    switch (head)
    {
        case 34: case 37:
            type = "American";
            break;
        case 51: case 52: case 53: case 54: case 55:
            type = "MasterCard";
            break;
        default:
            if (head / 10 == 4)
            {
                type = "VISA";
                break;
            }

            printf("%s\n" , INVALID);
            return false;
    }

    // run
    while (part1 > 0)
    {
        int digit1 = get_part1_digit(part1);
        int digit2 = get_part2_digit(part2);

        part1 = part1 / 100;
        part2 = part2 / 100;
        checksum = checksum + digit1 + digit2;
    }

    printf("%s\n", checksum % 10 == 0 ? type : INVALID);
    return false;
}


// function
int get_part1_digit(long part) {
    int digit = 0;
    int a = (part % 10) * 2;

    while (a > 0)
    {
        digit = digit + a % 10;
        a = a / 10;
    }

    return digit;
}

int get_part2_digit(long part) {
    int digit = part % 10;

    return digit;
}
