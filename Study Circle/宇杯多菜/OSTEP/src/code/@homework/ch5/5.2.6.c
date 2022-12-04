#include<stdio.h>
#include<unistd.h>
#include<stdlib.h>
#include<fcntl.h>
#include<string.h>
#include<sys/wait.h>

int main()
{
	char * s;
	int fd = open("./output/5.2.txt", O_CREAT|O_WRONLY|O_TRUNC, S_IRWXU);
	int rc = fork();

	if (rc < 0) {
		close(fd);
		fprintf(stderr, "fork failed");
		exit(1);
	} 
	
	if (rc == 0) {
		printf("%s\n", "child 0");
		sleep(1);

		printf("%s\n", "child 1");
		s = "I'm child!\n";

		printf("%s\n", "child 2");
		write(fd, s, strlen(s));
		
		printf("%s\n", "child 3");
	} else {
		printf("%s\n", "parent 0");
		sleep(2);

		printf("%s\n", "parent 1");
		s = "I'm parent\n";

		printf("%s\n", "parent 2");
		write(fd, s, strlen(s));
		
		printf("%s\n", "parent 3");
	}

	sleep(1);
	printf("%s\n", "out");
	write(fd, "out", 3);
	close(fd);

	
	return 0;
}


