#include<stdio.h>
#include<unistd.h>
#include<stdlib.h>
#include<fcntl.h>
#include<string.h>
#include<sys/wait.h>

int main()
{
	char * s;
	char * s2;
	int fd = open("./output/5.2.txt", O_CREAT|O_WRONLY|O_TRUNC, S_IRWXU);
	int rc = fork();

	if (rc < 0) {
		close(fd);
		fprintf(stderr, "fork failed");
		exit(1);
	} 
	
	if (rc == 0) {
		// sleep(1);
		s = "I'm child1!\n";
		s2 = "I'm child2!\n";
	} else {
		s = "I'm parent1\n";
		s2 = "I'm parent2\n";
	}
	printf("%i:%p\n",getpid(),&fd);
	int fd2 = open("./output/5.2.txt", O_CREAT|O_WRONLY|O_TRUNC, S_IRWXU);
	printf("%i:%p\n",getpid(),&fd2);
	sleep(1);


	off_t curr_pos = lseek(fd, 0, SEEK_CUR);
	// off_t curr_pos2 = lseek(fd2, 0, SEEK_CUR);
	printf("%i curr1:%lld \n",getpid(),curr_pos);



	// write(fd2, s2, strlen(s2));
	// sleep(1);
	write(fd, s, strlen(s));
	printf("%i curr2:%lld \n",getpid(),curr_pos);

	close(fd);
	close(fd2);
	
	return 0;
}

