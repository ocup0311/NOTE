#include <cs50.h>
#include <stdio.h>
#include <stdlib.h>
#include <stdint.h>
#include <string.h>
#include <unistd.h>

typedef uint8_t BYTE;
const int BLOCK_SIZE = 512;

// function
char* concat(const char *s1, const char *s2)
{
    char *result = malloc(strlen(s1) + strlen(s2) + 1);
    strcpy(result, s1);
    strcat(result, s2);
    return result;
}

char* gen_filename(int n)
{
    char str[3];
    sprintf(str, "%d", n);
    return concat(str, ".jpg");
}

bool is_jpg_head(BYTE *buffer)
{

  printf("%d", buffer[0]);

  return false;
}

// main
int main(int argc, char *argv[])
{
  printf("111");
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
  printf("7");

  BYTE buffer[BLOCK_SIZE];
  FILE *output;
  int n;

  while (fread(buffer, 1, BLOCK_SIZE, raw_file) == BLOCK_SIZE)
  {
    printf("1");
    if(is_jpg_head(buffer))
    {
      printf("2");
      fclose(output);
      char *filename = gen_filename(n);
      output = fopen(filename, "w");
      if (output == NULL)
      {
          printf("Could not open output file.\n");
          return 1;
      } 
      n++;
    }
    printf("3");
    
    fwrite(&buffer, sizeof(BLOCK_SIZE), 1, output);
  }

  fclose(raw_file);
}