#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <string.h>
#include <fcntl.h>
#include <assert.h>
#include <sys/wait.h>

int main(int argc, char *argv[])
{
    int rc = fork();

    if (rc < 0) {
        fprintf(stderr, "fork failed\n");
        exit(1);
    } else if (rc == 0) {
        close(STDOUT_FILENO); 
        int fd = open("./output/5.7.txt", O_CREAT|O_WRONLY|O_TRUNC, S_IRWXU);
        printf("This is child!\n");
    } else {
        printf("This is parent!\n");
    }

    return 0;
}
