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

// Detect edges
// 命名：
// (1) Gx: Grid x. (2) Sx: Sum of Gx.

BYTE cal_SxSy_to_Sz(int Sx, int Sy)
{
    int Sz = round(sqrt(pow(Sx, 2) + pow(Sy, 2)));

    return Sz > 255 ? 255 : Sz;
}

void edges(int height, int width, RGBTRIPLE image[height][width])
{
    // 複製一份用以記錄原始檔案
    RGBTRIPLE copyImage[height][width];

    for(int i = 0; i < height; i++)
        for(int j = 0; j < width; j++)
        {
            copyImage[i][j].rgbtRed = image[i][j].rgbtRed;
            copyImage[i][j].rgbtGreen = image[i][j].rgbtGreen;
            copyImage[i][j].rgbtBlue = image[i][j].rgbtBlue;
        }


    // 開始以濾鏡處理圖片
    int Gx[3][3] = { {-1, 0, 1}, {-2, 0, 2}, {-1, 0, 1} };
    int Gy[3][3] = { {-1, -2, -1}, {0, 0, 0}, {1, 2, 1} };
    
    for(int i = 0; i < height; i++)
        for(int j = 0; j < width; j++)
        {
            // 以下用來處理一個九宮格
            int SxR = 0, SxG = 0, SxB = 0, SyR = 0, SyG = 0, SyB = 0;

            for(int a = 0; a < 3; a++)
            {
                int h = a + i - 1;
                if( h < 0 || h >= height) continue;
                for(int b = 0; b < 3; b++)
                {
                    int w = b + j - 1;
                    if( w < 0 || w >= width) continue;
                    SxR = SxR + copyImage[h][w].rgbtRed * Gx[a][b];
                    SxG = SxG + copyImage[h][w].rgbtGreen * Gx[a][b];
                    SxB = SxB + copyImage[h][w].rgbtBlue * Gx[a][b];
                    SyR = SyR + copyImage[h][w].rgbtRed * Gy[a][b];
                    SyG = SyG + copyImage[h][w].rgbtGreen * Gy[a][b];
                    SyB = SyB + copyImage[h][w].rgbtBlue * Gy[a][b];
                } 
            }

            image[i][j].rgbtRed = cal_SxSy_to_Sz(SxR, SyR);
            image[i][j].rgbtGreen = cal_SxSy_to_Sz(SxG, SyG);
            image[i][j].rgbtBlue = cal_SxSy_to_Sz(SxB, SyB);
        }


    return;
}
