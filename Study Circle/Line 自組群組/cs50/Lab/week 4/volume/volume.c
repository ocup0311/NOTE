// Modifies the volume of an audio file

#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

// Number of bytes in .wav header
const int HEADER_SIZE = 44;

void printArr(uint8_t array[], int size)
{

    printf("[ ");
    for (int i = 0; i < size; i++) {
        printf("%d ", array[i]);
    }
    printf(" ]\n");
}

int main(int argc, char *argv[])
{
    // Check command-line arguments
    if (argc != 4)
    {
        printf("Usage: ./volume input.wav output.wav factor\n");
        return 1;
    }

    // Open files and determine scaling factor
    FILE *input = fopen(argv[1], "r");
    if (input == NULL)
    {
        printf("Could not open input file.\n");
        return 1;
    }

    FILE *output = fopen(argv[2], "w");
    if (output == NULL)
    {
        printf("Could not open output file.\n");
        return 1;
    }  

    float factor = atof(argv[3]);

    // TODO: Copy header from input file to output file

    uint8_t header[HEADER_SIZE];
    int16_t buffer1;
    int16_t buffer2;

    // printf("header1  ----------\n");
    // printf("%p : %u\n", &header,*header);
    // printArr(header, HEADER_SIZE);    
    
    fread(&header,sizeof(uint8_t),HEADER_SIZE,input);
    fwrite(&header,sizeof(uint8_t),HEADER_SIZE,output);

    // printf("header2  ----------\n");
    // printf("%p : %u\n", &header,*header);
    // printf("%p : %p\n", &header, header);
    // printArr(header, HEADER_SIZE);


    // TODO: Read samples from input file and write updated data to output file

    // int c = 0;
    while (fread(&buffer1,sizeof(int16_t),1,input)  )
    {
        buffer2 =buffer1 * factor;
        fwrite(&buffer2,sizeof(int16_t),1,output);
        
        // printf("%d : %d\n", buffer1,buffer2);

        // sleep(1);

        // printf("%d, ", buffer1);
        // c++;
        // if(c > 100)
        // {
        //     printf("\n");
        //     c = 0;
        // }
    }

    // Close files
    fclose(input);
    fclose(output);
}
