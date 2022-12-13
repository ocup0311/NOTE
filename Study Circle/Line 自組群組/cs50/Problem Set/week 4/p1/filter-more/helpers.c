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
BYTE cal_GxGy_to_Sz(int (*Gx)[3], int (*Gy)[3])
{
    int Sx = 0, Sy = 0;
    for(int i = 0; i < 3; i++)
    {
        for(int j = 0; j < 3; j++)
        {
            Sx += Gx[i][j];
            Sy += Gy[i][j];
        }
    }

    // int Sx1 = Sx < 0 ? 0 : Sx > 255 ? 255 : Sx;
    // int Sy1 = Sy < 0 ? 0 : Sy > 255 ? 255 : Sy;

    int result = round(sqrt(Sx*Sx + Sy*Sy));
    printf("Sx: %i, Sx^2: %i\n", Sx, Sx*Sx);
    // printf("Gx: %i ,Sx: %i, Sy: %i, result: %i\n", Gx[0][0], Sx, Sy, result);
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
    int Gx[3][3] = { {-1, 0, 1}, {-2, 0, 2}, {-1, 0, 1} };
    int Gy[3][3] = { {-1, -2, -1}, {0, 0, 0}, {1, 2, 1} };

    for(int i = 0; i < height; i++)
    {
        for(int j = 0; j < width; j++)
        {
            int GxR[3][3], GxG[3][3], GxB[3][3], GyR[3][3], GyG[3][3], GyB[3][3];

            for (int a = 0; a < 3; a++)
            {
                int h = a + i - 1;
                if(h < 0 || h >= width) continue;
                for (int b = 0; b < 3; b++)
                {
                    GxR[a][b] = 0;
                    GxG[a][b] = 0;
                    GxB[a][b] = 0;
                    GyR[a][b] = 0;
                    GyG[a][b] = 0;
                    GyB[a][b] = 0;
                    for (int c = 0; c < 3; c++)
                    {
                        int w = c + j - 1;
                        if(w < 0 || w >= height) continue;
                        // printf("GxR[a][b]: %i,copyImage[h][w].rgbtRed: %i,Gx[c][b]: %i\n",GxR[a][b], copyImage[h][w].rgbtRed, Gx[c][b]);
                        GxR[a][b] += copyImage[h][w].rgbtRed * Gx[c][b];
                        GxG[a][b] += copyImage[h][w].rgbtGreen * Gx[c][b];
                        GxB[a][b] += copyImage[h][w].rgbtBlue * Gy[c][b];
                        GyR[a][b] += copyImage[h][w].rgbtRed * Gy[c][b];
                        GyG[a][b] += copyImage[h][w].rgbtGreen * Gy[c][b];
                        GyB[a][b] += copyImage[h][w].rgbtBlue * Gy[c][b];
                    }
                }
            }

            // for(int i1 = 0; i1 < 3; i1++)
            // {
            //     for(int j1 = 0; j1 < 3; j1++)
            //     {
            //         printf("%i, ", GxR[i1][j1]);
            //     }
            //     printf("    ");
            //     for(int j2 = 0; j2 < 3; j2++)
            //     {
            //         printf("%i, ", GyR[i1][j2]);
            //     }
            //     printf("\n");
            // }
            image[i][j].rgbtRed = cal_GxGy_to_Sz(GxR, GyR);
            image[i][j].rgbtGreen = cal_GxGy_to_Sz(GxG, GyG);
            image[i][j].rgbtBlue = cal_GxGy_to_Sz(GxB, GyB);
        }
    }

    return;
}
