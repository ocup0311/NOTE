// 以 signal() 實現接收 ctrl-c 
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <string.h>
#include <sys/wait.h>
#include <signal.h>

void handler(int sig) {
  printf("You think hitting ctrl-c will stop me?\n");
  sleep(2);
  printf("Well...");
  sleep(1);
  printf("OK\n");
  exit(0);
}

int main() {
  signal(SIGINT, handler);  /* installs ctrl-c handler */
  while(1) {}
} 