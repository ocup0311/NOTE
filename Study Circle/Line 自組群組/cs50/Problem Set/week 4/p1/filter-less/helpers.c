#include "helpers.h"
#include <stdio.h>
#include <math.h>

// Convert image to grayscale
void grayscale(int height, int width, RGBTRIPLE image[height][width])
{
    BYTE gray;

    for(int i = 0; i < height; i++)
    {
        for(int j = 0; j < width; j++)
        {
            gray = round((image[i][j].rgbtRed + image[i][j].rgbtGreen + image[i][j].rgbtBlue) / 3.0);

            image[i][j].rgbtRed = gray;
            image[i][j].rgbtGreen = gray;
            image[i][j].rgbtBlue = gray;
        }
    }

    return;
}

BYTE calculate(float red,float green, float blue, RGBTRIPLE pixel )
{
    int result = round(red * pixel.rgbtRed + green * pixel.rgbtGreen + blue * pixel.rgbtBlue);

    while (result > 255)
    {
        result = result - 255;
    }
    
    return result;
}

// Convert image to sepia
void sepia(int height, int width, RGBTRIPLE image[height][width])
{
    BYTE sepiaRed, sepiaGreen, sepiaBlue;

    for(int i = 0; i < height; i++)
    {
        for(int j = 0; j < width; j++)
        {
            sepiaRed = calculate(0.393, 0.769, 0.189, image[i][j]);
            sepiaGreen = calculate(0.349, 0.686, 0.168, image[i][j]);
            sepiaBlue = calculate(0.272, 0.534, 0.131, image[i][j]);
            
            image[i][j].rgbtRed = sepiaRed;
            image[i][j].rgbtGreen = sepiaGreen;
            image[i][j].rgbtBlue = sepiaBlue;
        }
    }

    return;
}

void swap(RGBTRIPLE *a, RGBTRIPLE *b)
{
    RGBTRIPLE tmp = *a;
    *a = *b; 
    *b = tmp;

    return;
}

// Reflect image horizontally
void reflect(int height, int width, RGBTRIPLE image[height][width])
{


    for(int i = 0; i < height; i++)
    {
        for(int j = 0; j < width / 2; j++)
        {
            swap(&image[i][j],&image[i][width-j-1]);
        }
    }

    return;
}

// Blur image
void blur(int height, int width, RGBTRIPLE image[height][width])
{
    return;
}
