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
		sleep(3);
		printf("[END] child1: %i\n",  getpid());
	} else {
		printf("[END] parent1: %i\n",  getpid());
	}


	int rc2 = fork();
	printf("fork2: %i\n",  getpid());
	int wc = waitpid(rc1, NULL, 0);
	printf("wait: %i wc: %i rc1: %i\n",  getpid(),wc,rc1);
  
	if (rc2 < 0) {
		fprintf(stderr, "fork failed");
		exit(1);
	} else if (rc2 == 0) {
		printf("[END] child2: %i  wc: %i  rc1: %i rc2: %i\n",  getpid(),wc, rc1, rc2);
	} else {
		printf("[END] parent2: %i  wc: %i  rc1: %i rc2: %i\n",  getpid(),wc, rc1, rc2);
	}


	return 0;
}