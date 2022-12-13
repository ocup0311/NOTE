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
            BYTE gray = round((image[i][j].rgbtRed + image[i][j].rgbtGreen + image[i][j].rgbtBlue) / 3.0);

            image[i][j].rgbtRed = gray;
            image[i][j].rgbtGreen = gray;
            image[i][j].rgbtBlue = gray;
        }
    }

    return;
}

// Convert image to sepia
BYTE cal_sepia(float rateR, float rateG, float rateB, RGBTRIPLE *pixel )
{
    int result = round(rateR * (*pixel).rgbtRed + rateG * (*pixel).rgbtGreen + rateB * (*pixel).rgbtBlue);

    return result > 255 ? 255 : result;
}

void sepia(int height, int width, RGBTRIPLE image[height][width])
{
    for(int i = 0; i < height; i++)
    {
        for(int j = 0; j < width; j++)
        {
            RGBTRIPLE *pixel = &image[i][j];
            BYTE sepiaR = cal_sepia(0.393, 0.769, 0.189, pixel);
            BYTE sepiaG = cal_sepia(0.349, 0.686, 0.168, pixel);
            BYTE sepiaB = cal_sepia(0.272, 0.534, 0.131, pixel);
            
            (*pixel).rgbtRed = sepiaR;
            (*pixel).rgbtGreen = sepiaG;
            (*pixel).rgbtBlue = sepiaB;
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
            swap_RGBTRIPLE(&image[i][j], &image[i][width-j-1]);
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
        for(int j = 0; j < width; j++)
        {
            // 以下用來處理一個九宮格
            int sumR = 0, sumG = 0, sumB = 0;
            float count = 0;

            for(int a = 0; a < 3; a++)
            {
                int h = a + i - 1;
                if( h < 0 || h >= height) continue;
                for(int b = 0; b < 3; b++)
                {
                    int w = b + j - 1;
                    if( w < 0 || w >= width) continue;
                    sumR += copyImage[h][w].rgbtRed;
                    sumG += copyImage[h][w].rgbtGreen;
                    sumB += copyImage[h][w].rgbtBlue;
                    count++;
                } 
            }

            image[i][j].rgbtRed = round(sumR / count);
            image[i][j].rgbtGreen = round(sumG / count);
            image[i][j].rgbtBlue = round(sumB / count);
        }

    return;
}
