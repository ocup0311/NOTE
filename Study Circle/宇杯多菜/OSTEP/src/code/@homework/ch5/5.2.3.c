#include<stdio.h>
#include<unistd.h>
#include<stdlib.h>
#include<fcntl.h>
#include<string.h>
#include<sys/wait.h>

int main()
{
	char * s;
	FILE *stream;
	stream = fopen("./output/5.2.txt", "wb");
	int rc = fork();

	if (rc < 0) {
		fclose(stream);
		fprintf(stderr, "fork failed");
		exit(1);
	} 
	
	if (rc == 0) {
		printf("%s\n", "child 0");
		sleep(1);

		printf("%s\n", "child 1");
		s = "I'm child!\n";

		printf("%s\n", "child 2");
		fwrite( s, strlen(s),1,stream);
		
		printf("%s\n", "child 3");
		fclose(stream);	

		printf("%s\n", "child 4");
	} else {
		printf("%s\n", "parent 0");
		sleep(1);

		printf("%s\n", "parent 1");
		s = "I'm parent\n";

		printf("%s\n", "parent 2");
		fwrite( s, strlen(s),1,stream);
		
		printf("%s\n", "parent 3");
		fclose(stream);
	}

	fwrite( "out", 3,1,stream);
	printf("%s\n", "out");

	
	return 0;
}

