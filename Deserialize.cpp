#include <bits/stdc++.h>
#include <regex>
using namespace std;

int main() {
    string source;
    getline(cin,source);
    for(int i = 0; i < source.length(); i++) {
        if(source[i] == '\\'){
            char next = source[i+1];
            switch (next)
            {
            case 'n':
                cout << endl;
                i++;
                break;
            case 't':
                cout << '\t';
                i++;
            case '\"':
                cout << '\"';
                i++;
            default:
                break;
            }
        }else{
            cout << source[i];
        }
    }
}