CFLAGS = -Wall -O2

main : test.c
	gcc ${CFLAGS} $^ -o $@
	./$@ input.txt output.txt