#include <cs50.h>
#include <stdio.h>
#include <stdlib.h>
#include <stdint.h>
#include <string.h>
#include <unistd.h>

typedef uint8_t BYTE;
const int BLOCK_SIZE = 512;
const BYTE SINGN_JPG1[3] = {255, 216, 255};
const BYTE SINGN_JPG2[2] = {224, 239};

// function
void printArr(BYTE array[], int size)
{
    printf("[ ");

    for (int i = 0; i < 4; i++) 
        printf("%d ", array[i]);

    printf(" ]\n");
}

char* concat(const char *s1, const char *s2)
{
    char *result = malloc(strlen(s1) + strlen(s2) + 1);
    strcpy(result, s1);
    strcat(result, s2);
    return result;
}

char* gen_filename(int num)
{
    char filename[4];
    sprintf(filename, "%03d", num);
    return concat(filename, ".jpg");
}

bool is_jpg_head(BYTE buffer[])
{
  for(int i = 0; i < 3; i++)
    if(buffer[i] != SINGN_JPG1[i]) return false;

  for(int i = 0; i < 2; i++)
    if(buffer[3] == SINGN_JPG2[i])
    {
      printArr(buffer, BLOCK_SIZE);
      return true;
    } 

  return false;
}

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
  int n = 0;
  // 測試用 ------------------------
  // char *filename = gen_filename(12);
  // output = fopen(filename, "w");
  // 測試用 ------------------------

  while (fread(buffer, sizeof(BYTE), BLOCK_SIZE, raw_file) == BLOCK_SIZE)
  {
    if(is_jpg_head(buffer))
    {
      // 結束測試再打開 ----------------------------
      if(output != NULL)
      {
        printf("close: %i\n\n", n);
        fclose(output);
      }
      char *filename = gen_filename(n);
      output = fopen(filename, "w");
      printf("--> open: %i\n\n", n);
      if (output == NULL)
      {
          printf("Could not open output file.\n");
          return 1;
      } 
      // 結束測試再打開 ----------------------------
      n++;
    }
    
    // fwrite(&buffer, sizeof(BYTE), BLOCK_SIZE, output);
  }


  fclose(raw_file);
  // fclose(output);
}