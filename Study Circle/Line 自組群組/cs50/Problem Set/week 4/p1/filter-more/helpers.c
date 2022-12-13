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


// Detect edges
BYTE cal_edges(float GxSum, float GySum)
{
    int result = round(sqrt(pow(GxSum, 2) + pow(GySum, 2)) / 9);

    printf("11: %f, 22: %f %f %f\n", sqrt(pow(GxSum, 2) + pow(GySum, 2)) / 9, 
    pow(GxSum, 2), 
    GxSum, 
    sqrt(pow(GxSum, 2)));
    return result > 255 ? 255 : result;
}

void edges(int height, int width, RGBTRIPLE image[height][width])
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
    int Gx[3][3] = { {-1, 0, 1}, {-2, 0, 2}, {-1, 0, 1}};
    int Gy[3][3] = { {-1, -2, -1}, {0, 0, 0}, {1, 2, 1}};
    for(int i = 0; i < height; i++)
    {
        for(int j = 0; j < width; j++)
        {
            int GxR[3][3], GxG[3][3], GxB[3][3], GyR[3][3], GyG[3][3], GyB[3][3];
            int SxR, SxG, SxB, SyR, SyG, SyB;
            
            // 以下用來處理一個九宮格
            // 命名方式： s: start, e: end, h: height, w: width, c: count
            // float edgeGxSumRed = 0, edgeGxSumGreen = 0, edgeGxSumBlue = 0, edgeGySumRed = 0, edgeGySumGreen = 0, edgeGySumBlue = 0;
            // int sh = i - 1 > 0 ? i - 1 : 0;
            // int eh = i + 2 < height ? i + 2 : height;
            // int sw = j - 1 > 0 ? j - 1 : 0;
            // int ew = j + 2 < width ? j + 2 : width;
            // int c = (eh - sh) * (ew - sw);

            for(int a = sh; a < eh; a++)
            {
                for(int b = sw; b < ew; b++)
                {
                    // int Gx = (b - j) * (a == i ? 2 : 1);
                    // int Gy = (a - i) * (b == j ? 2 : 1);
                    // edgeGxSumRed = edgeGxSumRed + copyImage[a][b].rgbtRed * Gx;
                    // edgeGxSumGreen = edgeGxSumGreen + copyImage[a][b].rgbtGreen * Gx;
                    // edgeGxSumBlue = edgeGxSumBlue + copyImage[a][b].rgbtBlue * Gx;
                    // edgeGySumRed = edgeGySumRed + copyImage[a][b].rgbtRed * Gy;
                    // edgeGySumGreen = edgeGySumGreen + copyImage[a][b].rgbtGreen * Gy;
                    // edgeGySumBlue = edgeGySumBlue + copyImage[a][b].rgbtBlue * Gy;

                    GxR[a][b] = Gx[a][b] * copyImage[a][b].rgbtRed;

                } 
            }

            image[i][j].rgbtRed = cal_edges(SxR, SyR);
            image[i][j].rgbtGreen = cal_edges(SxG, SyG);
            image[i][j].rgbtBlue = cal_edges(SxB, SyB);
        }
    }

    return;
}
