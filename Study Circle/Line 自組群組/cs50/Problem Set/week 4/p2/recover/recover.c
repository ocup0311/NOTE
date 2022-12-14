#include <cs50.h>
#include <stdio.h>
#include <stdlib.h>
#include <stdint.h>
#include <string.h>
#include <unistd.h>

typedef uint8_t BYTE;
const int BLOCK_SIZE = 512;
BYTE SINGN_JPG1[3] = {0xff, 0xd8, 0xff};
BYTE SINGN_JPG2 = 0xe0;

// function
bool is_jpg_head(BYTE *buffer);

// main
int main(int argc, char *argv[])
{
  if (argc != 2)
  {
    printf("Usage: ./recover card.raw\n");
    return 1;
  }

  FILE *raw_file = fopen(argv[1], "r");
  if (raw_file == NULL)
  {
    printf("Could not open input file.\n");
    return 1;
  }

  BYTE buffer[BLOCK_SIZE];
  FILE *output = NULL;
  int num = 0;

  while (fread(buffer, sizeof(BYTE), BLOCK_SIZE, raw_file) == BLOCK_SIZE)
  {
    if(is_jpg_head(buffer))
    {
      if(output != NULL) 
      {
        fclose(output);
        num++;
      }
      char filename[8];
      sprintf(filename, "%03i.jpg", num);
      output = fopen(filename, "w");
      if (output == NULL)
      {
          printf("Could not open output file.\n");
          fclose(raw_file);
          return 1;
      } 
    }
    
    if(output != NULL) fwrite(buffer, sizeof(buffer), 1, output);
  }

  fclose(raw_file);
  fclose(output);
}

// function
bool is_jpg_head(BYTE *buffer)
{
  for(int i = 0; i < 3; i++)
    if(buffer[i] != SINGN_JPG1[i]) return false;

  if((buffer[3] & 0xf0) == SINGN_JPG2) return true;

  return false;
}