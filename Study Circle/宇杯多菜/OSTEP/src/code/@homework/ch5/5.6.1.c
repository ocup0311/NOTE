#include<stdio.h>
#include<unistd.h>
#include<stdlib.h>

int main()
{
	int rc = fork();
	int wc = waitpid(rc, NULL, 0);
  
	if (rc < 0) {
		fprintf(stderr, "fork failed");
		exit(1);
	} else if (rc == 0) {
		sleep(1);
		printf("hello\n wc: %i\n child pid: %i\n", wc,  getpid());
	} else {
		printf("goodbye\n wc: %i\n parent pid: %i\n", wc,  getpid());
	}

	return 0;
}