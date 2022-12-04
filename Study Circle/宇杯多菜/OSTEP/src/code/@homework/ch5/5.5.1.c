#include<stdio.h>
#include<unistd.h>
#include<stdlib.h>

int main()
{
	int rc = fork();
  
	if (rc < 0) {
		fprintf(stderr, "fork failed");
		exit(1);
	} else if (rc == 0) {
		printf("hello\n child pid: %i\n", getpid());
	} else {
		int wc = wait(NULL);
		printf("goodbye\n wc: %i\n parent pid: %i\n", wc, getpid());
	}

	return 0;
}