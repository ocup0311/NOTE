// 使用兩次 pipe 的範例，等同於下指令： ls -l | wc -w | wc -c
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
		int pipefd1[2];
		int pipefd2[2];

		do_pipe(pipefd1);
		do_pipe(pipefd2);

    int pid1 = fork();
    if(isChild(pid1))
    {

        close(pipefd1[0]);
        close(pipefd2[0]);
        close(pipefd2[1]);
        dup2(pipefd1[1], STDOUT_FILENO);
        close(pipefd1[1]); 
        execlp("ls", "ls", "-l", NULL);
    }

    int pid2 = fork();
    if(isChild(pid2))
    {
        close(pipefd1[1]); 
        close(pipefd2[0]); 
        dup2(pipefd1[0], STDIN_FILENO);
        dup2(pipefd2[1], STDOUT_FILENO);
        close(pipefd1[0]); 
        close(pipefd2[1]); 
        execlp("wc", "wc", "-w", NULL);
    }

    int pid3 = fork();
    if(isChild(pid3))
    {
        close(pipefd1[0]); 
        close(pipefd1[1]); 
        close(pipefd2[1]); 
        dup2(pipefd2[0], STDIN_FILENO);
        close(pipefd2[0]); 
        execlp("wc", "wc", "-c", NULL);
    }

    // wait(NULL);

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

