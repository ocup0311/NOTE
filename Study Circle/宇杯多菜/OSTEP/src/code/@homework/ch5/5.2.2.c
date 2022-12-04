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
		close(fd);	

		printf("%s\n", "child 4");
	} else {
		printf("%s\n", "parent 0");
		sleep(1);

		printf("%s\n", "parent 1");
		s = "I'm parent\n";

		printf("%s\n", "parent 2");
		write(fd, s, strlen(s));
		
		printf("%s\n", "parent 3");
		close(fd);
	}


	
	return 0;
}


// 三次結果：
// 1.
// parent 0
// child 0
// child 1
// child 2
// parent 1
// parent 2
// child 3
// child 4
// parent 3

// 2.
// parent 0
// child 0
// child 1
// child 2
// child 3
// child 4
// parent 1
// parent 2
// parent 3

// 3.
// parent 0
// child 0
// child 1
// child 2
// parent 1
// child 3
// parent 2
// child 4
// parent 3