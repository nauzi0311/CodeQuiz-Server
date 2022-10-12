#include <iostream>
#include <fstream>
#include <string>
#include <sstream>
#include <vector>
#include <bitset>
#include <regex>

using namespace std;
vector<string> Tokens;
// bool TokenChecker(vector<string>,int);
// bool DefineIncludeChecker(vector<string>,int);
// void print_script(vector<string>);

bool TokenChecker(vector<string> &tokens,int i){
    string type[] = {"int","float","double","char","enum","extern","long","register","signed","unsigned","short","static","struct","union","void","auto","const","volatile"};
    string control[] = {"break","continue","case","default","do","else","for","goto","if","return","switch","typedef","while"};
    for(auto s : type){
        if(tokens[i] == s){
            tokens[i] = "<color=#358cd6>" + tokens[i] + "</color>";
            return true;
        }
    }
    for(auto s : control){
        if(tokens[i] == s){
            tokens[i] = "<color=#c586c0>" + tokens[i] + "</color>";
            return true;
        }
    }
    return false;
}

bool DefineIncludeChecker(vector<string> &tokens,int i){
    if(tokens[i][0] == '#'){
        tokens[i] = "<color=#c586c0>" + tokens[i] + "</color>";
        tokens[i + 1] = "<color=#ce9178>" + tokens[i + 1] + "</color>";
        return true;
    }
    return false;
}

bool Bracket(vector<string> &tokens,int i){
    string color_code[] = {"ffd700","da70d6","179fff"};
    static int bracket_count = 0;
    string token = tokens[i];
    if((int pos = token.find("(")) != string::npos){
        string _tmpp = token.substr(0,pos);
        string _tmpa = "";
        if(pos+1 <= token.length()-1){
            _tmpa = token.substr(pos+1,token.length()-1);
        }

    }
}
void print_script(vector<string> Tokens){
    int tab_count = 0;
    for(int i = 0; i < Tokens.size(); i++) {
        char last = Tokens[i][Tokens[i].length() - 1];
        cout << Tokens[i] << " ";
        switch (last)
        {
        case '{':
            tab_count++;
            
            break;
        case ';':
            cout << endl;
            if(i + 1 < Tokens.size()){
                if(Tokens[i+1][Tokens[i+1].length() - 1] == '}') tab_count--;
                for(int j = 0; j < tab_count;j++){
                    cout << '\t';
                }
            }
            break;
        default:
            regex re(R"(<.*\.h>)");
            if(regex_search(Tokens[i],re)){
                cout << endl;
            }
            break;
        }
    }
}

int main() {
    ifstream file("./test.c");
    if(!file){
        cout << "Error!";
    }

    string line;
    while(getline(file,line)){
        string token;
        istringstream stream(line);
        while(getline(stream,token,' ')){
            if(token == "\0")continue;
            Tokens.push_back(token);
        }
    }
    for(int i = 0; i < Tokens.size(); i++){
        if(TokenChecker(Tokens,i))continue;
        if(DefineIncludeChecker(Tokens,i)){
            i++;
            continue;
        }
    }
    print_script(Tokens);
}

