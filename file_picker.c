#include <stdio.h>
#include <string.h>

#define BUFFER 256

int main(int argc, char const *argv[])
{
    const char *file = "./test.c";

    FILE *fp;

    fp = fopen(file, "r");

    
    if (fp == NULL)
    {
        printf("%sのオープンに失敗しました。\n", file);
        printf("Enterキーで終了。\n");
        getchar();
        return 0;
    }

    char line[BUFFER];
    while(fgets(line, BUFFER, fp) != NULL)
    {
        int i = 0;
        int linec = 0;
        char tline[BUFFER];
        memcpy(tline,line,BUFFER);
        for(linec = 0;line[linec] != '\0';linec++);
        for(i = 0;line[i] != '\0';i++){
            if(line[i] == '\n'){
                tline[i] = '\\';
                tline[i+1] = 'n';
                memcpy(tline+(i+2),line+(i+1),BUFFER-i);
                memcpy(line,tline,BUFFER);
            }
            if(line[i] == '\t'){
                tline[i] = '\\';
                tline[i+1] = 't';
                memcpy(tline+(i+2),line+(i+1),BUFFER-i);
                memcpy(line,tline,BUFFER);
            }
            if(line[i] == '\"'){
                tline[i] = '\\';
                tline[i+1] = '\"';
                memcpy(tline+(i+2),line+(i+1),BUFFER-i);
                memcpy(line,tline,BUFFER);
                i++;
            }
            if(line[i] == ' '){
                if(line[i+1] == ' '){
                    if(line[i+2] == ' '){
                        if(line[i+3] == ' '){
                            tline[i] = '\\';
                            tline[i+1] = 't';
                            memcpy(tline+(i+2),line+(i+4),BUFFER-(i+3));
                            memcpy(line,tline,BUFFER);
                        }
                    }
                }

            }
        }
        printf("%s", line);
    }

    fclose(fp);

    return 0;
}
