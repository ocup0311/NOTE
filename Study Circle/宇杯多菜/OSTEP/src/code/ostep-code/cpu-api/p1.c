#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

int
main(int argc, char *argv[])
{
    printf("1-1, (pid:%d)\n", (int) getpid());
    int rc1 = fork();
    printf("1-2, rc: %i\n", rc1);

    if (rc1 < 0) {
        // fork failed; exit
        fprintf(stderr, "fork failed\n");
        exit(1);
    } else if (rc1 == 0) {
        // child (new process)
	    sleep(1);
        printf("1-3, I am child (pid:%d)\n", (int) getpid());
    } else {
        // parent goes down this path (original process)
        printf("1-4, I am parent of %d (pid:%d)\n",
	       rc1, (int) getpid());
    }

    // printf("2-1, (pid:%d)\n", (int) getpid());
    // int rc2 = fork();
    // printf("2-2, rc: %i\n", rc2);

    // if (rc2 < 0) {
    //     // fork failed; exit
    //     fprintf(stderr, "fork failed\n");
    //     exit(1);
    // } else if (rc2 == 0) {
    //     // child (new process)
    //     printf("2-3, I am child (pid:%d)\n", (int) getpid());
    // } else {
    //     // parent goes down this path (original process)
    //     printf("2-4, I am parent of %d (pid:%d)\n",
	//        rc2, (int) getpid());
    // }


    return 0;
}
