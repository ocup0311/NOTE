// 使用一次 pipe 的範例，等同於下指令： ls -l | wc -w
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <string.h>
#include <fcntl.h>
#include <assert.h>
#include <sys/wait.h>

// declare
void do_pipe(int* pipefd);
int isChild(int pid);

// main
int main(int argc, char *argv[])
{
	int pipefd[2];
    do_pipe(pipefd);

    int pid1 = fork();
    if(isChild(pid1))
    {
        printf("1\n");
        sleep(3);
        printf("2\n");
        close(pipefd[0]);
        dup2(pipefd[1], STDOUT_FILENO);
        close(pipefd[1]); 
        execlp("ls", "ls", "-l", NULL);
    }

    int pid2 = fork();
    if(isChild(pid2))
    {
        printf("3\n");
        sleep(2);
        printf("4\n");
        close(pipefd[1]); 
        dup2(pipefd[0], STDIN_FILENO);
        close(pipefd[0]); 
        execlp("wc", "wc", "-w", NULL);
    }

    // int wid = wait(NULL);
    // int wid = waitpid(-1, NULL, 0);
    int wid = waitpid(pid1, NULL, 0);
    printf("wait: %i, getpid: %i, pid1: %i, pid2: %i\n", wid, getpid(), pid1, pid2);
    // int wid2 = wait(NULL);
    // int wid2 = waitpid(pid2, NULL, 0);
    // printf("wait: %i", wid2);
    return 0;
}

// funciton
void do_pipe(int* pipefd)
{
		if(pipe(pipefd) == -1)
		{
				fprintf(stderr, "pipe failed");
				exit(1);
		}

		return;
}

int isChild(int pid)
{
    if (pid < 0) {
        fprintf(stderr, "fork failed\n");
        exit(1);
    } else if (pid == 0) {
        printf("This is child %i!\n", getpid());
        return 1;
    } else {
        printf("This is parent %i!\n", getpid());
    }
    return 0;
}