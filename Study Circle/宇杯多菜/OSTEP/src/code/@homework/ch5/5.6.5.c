#include<stdio.h>
#include<unistd.h>
#include<stdlib.h>

int main()
{
	int rc1 = fork();
	printf("fork1: %i\n",  getpid());
  
	if (rc1 < 0) {
		fprintf(stderr, "fork failed");
		exit(1);
	} else if (rc1 == 0) {
		sleep(2);
		printf("[END] child1: %i\n",  getpid());
	} else {
		printf("[END] parent1: %i\n",  getpid());
	}


	int rc2 = fork();
	printf("fork2: %i\n",  getpid());

  
	if (rc2 < 0) {
		fprintf(stderr, "fork failed");
		exit(1);
	} else if (rc2 == 0) {
		sleep(1);
		printf("[END] child2: %i  rc1: %i rc2: %i\n",  getpid(), rc1, rc2);
	} else {
		// int wc = waitpid(rc2, NULL, 0);
		// int wc = wait(NULL);
		// int wc = waitpid(rc1, NULL, 0);
		int wc = waitpid(-1, NULL, 0);
		printf("[END] parent2: %i  wc: %i  rc1: %i rc2: %i\n",  getpid(),wc, rc1, rc2);
	}


	return 0;
}