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
		int wc = wait(NULL);
		printf("hello %i %i\n", wc, getpid());
	} else {
		sleep(1);
		printf("goodbye %i\n", getpid());
	}

	return 0;
}