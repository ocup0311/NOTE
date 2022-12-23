#include <stdio.h>
#include <unistd.h>
#include <fcntl.h>

int main(int argc, char *argv[])
{
    close(STDOUT_FILENO); 
    int fd = open("./output/5.7.txt", O_CREAT|O_WRONLY|O_TRUNC, S_IRWXU);
    printf("This is print1!\n");
    sleep(5);
    printf("This is print2!\n");
    close(fd); 

    return 0;
}
