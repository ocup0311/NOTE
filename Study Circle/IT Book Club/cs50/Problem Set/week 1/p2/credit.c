// Luhn’s Algorithm

#include <stdio.h>
#include <cs50.h>
#include <math.h>

const char *INVALID = "INVALID";
const long CHECK_V13 = 1000000000000;
const long CHECK_A15 = 10000000000000;
const long CHECK_M16 = 100000000000000;
const long CHECK_V16 = 1000000000000000;

// declare
int get_part1_digit(long part);
int get_part2_digit(long part);

// main
int main(void)
{
    // var
    long num = get_long("Number: ");
    long part1 = num / 10;
    long part2 = num;
    int len = (int)log10(num) + 1;
    int checksum = 0;
    char *type;

    switch(len)
    {
        case 13: 
            switch(num/CHECK_V13)
            {
                case 4:
                    type = "VISA";
                    break;
                default:
                    printf("%s\n", INVALID);
                    return 0;
            }
            break;

        case 15:
            switch(num/CHECK_A15)
            {
                case 34: case 37:
                    type = "AMEX";
                    break;
                default:
                    printf("%s\n", INVALID);
                    return 0;
            }
            break;

        case 16:
            switch(num/CHECK_M16)
            {
                case 51: case 52: case 53: case 54: case 55:
                    type = "MASTERCARD";
                    break;
                case 40: case 41: case 42: case 43: case 44: case 45: case 46: case 47: case 48: case 49:
                    type = "VISA";
                    break;
                default:
                    printf("%s\n", INVALID);
                    return 0;
            }
            break;

        default:
            printf("%s\n", INVALID);
            return 0;
    }

    // run
    while (part2 > 0)
    {
        int digit1 = get_part1_digit(part1);
        int digit2 = get_part2_digit(part2);

        part1 = part1 / 100;
        part2 = part2 / 100;
        checksum += digit1 + digit2;
    }

    printf("%s\n", checksum % 10 == 0 ? type : INVALID);
    return 0;
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
