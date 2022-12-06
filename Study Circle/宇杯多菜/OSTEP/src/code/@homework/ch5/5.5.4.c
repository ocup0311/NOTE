#include<stdio.h>
#include<unistd.h>
#include<stdlib.h>

int main()
{
	int rc1 = fork();

  
	if (rc1 < 0) {
		fprintf(stderr, "fork failed");
		exit(1);
	} else if (rc1 == 0) {
		sleep(2);
		printf("1.hello\n child pid: %i\n",  getpid());
	} else {
		printf("1.goodbye\n parent pid: %i\n",  getpid());
	}


	int rc2 = fork();
	int wc = wait(NULL);
  
	if (rc2 < 0) {
		fprintf(stderr, "fork failed");
		exit(1);
	} else if (rc2 == 0) {
		sleep(1);
		printf("2.hello\n wc: %i\n child pid: %i\n", wc,  getpid());
	} else {
		printf("2.goodbye\n wc: %i\n parent pid: %i\n", wc,  getpid());
	}

	return 0;
}