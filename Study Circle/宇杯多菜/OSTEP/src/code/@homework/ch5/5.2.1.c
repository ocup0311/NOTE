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
		sleep(1);
		s = "I'm child!\n";
	} else {
		s = "I'm parent\n";
	}

	write(fd, s, strlen(s));
	close(fd);
	
	return 0;
}