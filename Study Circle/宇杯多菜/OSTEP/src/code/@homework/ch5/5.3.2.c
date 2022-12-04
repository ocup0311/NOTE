#include<stdio.h>
#include<unistd.h>
#include<stdlib.h>

int main()
{
	int rc = vfork();
  
	if (rc < 0) {
		fprintf(stderr, "fork failed");
		exit(1);
	} else if (rc == 0) {
		printf("hello\n");
	} else {
		printf("goodbye\n");
	}

	return 0;
}