#include "helpers.h"
#include <stdio.h>
#include <math.h>

// Convert image to grayscale
void grayscale(int height, int width, RGBTRIPLE image[height][width])
{
    for(int i = 0; i < height; i++)
    {
        for(int j = 0; j < width; j++)
        {
            BYTE rgbtGray = round((image[i][j].rgbtRed + image[i][j].rgbtGreen + image[i][j].rgbtBlue) / 3.0);

            image[i][j].rgbtRed = rgbtGray;
            image[i][j].rgbtGreen = rgbtGray;
            image[i][j].rgbtBlue = rgbtGray;
        }
    }

    return;
}

// Convert image to sepia
BYTE calculate_sepia(float ratered, float rateGreen, float rateBlue, RGBTRIPLE pixel )
{
    int result = round(ratered * pixel.rgbtRed + rateGreen * pixel.rgbtGreen + rateBlue * pixel.rgbtBlue);

    return result > 255 ? 255 : result;
}

void sepia(int height, int width, RGBTRIPLE image[height][width])
{

    for(int i = 0; i < height; i++)
    {
        for(int j = 0; j < width; j++)
        {
            BYTE sepiaRed = calculate_sepia(0.393, 0.769, 0.189, image[i][j]);
            BYTE sepiaGreen = calculate_sepia(0.349, 0.686, 0.168, image[i][j]);
            BYTE sepiaBlue = calculate_sepia(0.272, 0.534, 0.131, image[i][j]);
            
            image[i][j].rgbtRed = sepiaRed;
            image[i][j].rgbtGreen = sepiaGreen;
            image[i][j].rgbtBlue = sepiaBlue;
        }
    }

    return;
}

// Reflect image horizontally
void swap_RGBTRIPLE(RGBTRIPLE *a, RGBTRIPLE *b)
{
    RGBTRIPLE tmp = *a;
    *a = *b; 
    *b = tmp;

    return;
}

void reflect(int height, int width, RGBTRIPLE image[height][width])
{
    for(int i = 0; i < height; i++)
    {
        for(int j = 0; j < width / 2; j++)
        {
            swap_RGBTRIPLE(&image[i][j],&image[i][width-j-1]);
        }
    }

    return;
}

// Blur image
void blur(int height, int width, RGBTRIPLE image[height][width])
{
    // 複製一份用以記錄原始檔案
    RGBTRIPLE copyImage[height][width];

    for(int i = 0; i < height; i++)
    {
        for(int j = 0; j < width; j++)
        {
            copyImage[i][j].rgbtRed = image[i][j].rgbtRed;
            copyImage[i][j].rgbtGreen = image[i][j].rgbtGreen;
            copyImage[i][j].rgbtBlue = image[i][j].rgbtBlue;
        }
    }

    // 開始以濾鏡處理圖片
    for(int i = 0; i < height; i++)
    {
        for(int j = 0; j < width; j++)
        {
            // 以下用來處理一個九宮格
            // 命名方式： s: start, e: end, h: height, w: width, c: count
            float blurSumRed = 0, blurSumGreen = 0, blurSumBlue = 0;
            int sh = i - 1 > 0 ? i - 1 : 0;
            int eh = i + 2 < height ? i + 2 : height;
            int sw = j - 1 > 0 ? j - 1 : 0;
            int ew = j + 2 < width ? j + 2 : width;
            int c = (eh - sh) * (ew - sw);

            for(int x = sh; x < eh; x++)
            {
                for(int y = sw; y < ew; y++)
                {
                    blurSumRed = blurSumRed + copyImage[x][y].rgbtRed;
                    blurSumGreen = blurSumGreen + copyImage[x][y].rgbtGreen;
                    blurSumBlue = blurSumBlue + copyImage[x][y].rgbtBlue;
                } 
            }

            image[i][j].rgbtRed = round(blurSumRed / c);
            image[i][j].rgbtGreen = round(blurSumGreen / c);
            image[i][j].rgbtBlue = round(blurSumBlue / c);
        }
    }

    return;
}
