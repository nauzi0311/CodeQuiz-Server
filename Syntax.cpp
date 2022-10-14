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

string insert_color_code_for_Bracket(int pos,string token,string color_code,string bracket){
    string _tmpp = token.substr(0,pos);
    string _tmpa = "";
    if(pos+1 <= token.length()-1){
        _tmpa = token.substr(pos+1,token.length()-1);
    }
    string result = _tmpp + "<color=" + color_code + ">" + bracket + "</color>" + _tmpa;
    cout << endl << "color_code: " << color_code << endl;
    return result;
}

bool BracketChecker(vector<string> &tokens,int i){
    string color_code[] = {"#ffd700","#da70d6","#179fff"};
    static int bracket_count = 3;
    string token = tokens[i];
    //string search = token;
    int pos = 0;
    int next = pos;
    //while(next < token.length()){
        if( ((pos = token.substr(next).find("(")) != string::npos) || 
            ((pos = token.substr(next).find("{")) != string::npos) || 
            ((pos = token.substr(next).find("[")) != string::npos) ||
            ((pos = token.substr(next).find(")")) != string::npos) ||
            ((pos = token.substr(next).find("}")) != string::npos) ||
            ((pos = token.substr(next).find("]")) != string::npos)){
            string hit_bracket = {token[pos + next]};
            if
            token = insert_color_code_for_Bracket(pos,token,color_code[bracket_count++%3],hit_bracket);
            next += pos;
        }
        if( ((pos = token.substr(next).find(")")) != string::npos) || ((pos = token.substr(next).find("}")) != string::npos) || ((pos = token.substr(next).find("]")) != string::npos)){
            string hit_bracket = {token[pos + next]};
            token = insert_color_code_for_Bracket(pos,token,color_code[--bracket_count%3],hit_bracket);
            next += pos;
        }
    //}

    // if((pos = token.find("(")) != string::npos){
    //     token = insert_color_code_for_Bracket(pos,token,color_code[bracket_count++%3],"(");
    // }
    // if((pos = token.find(")")) != string::npos){
    //     token = insert_color_code_for_Bracket(pos,token,color_code[--bracket_count%3],")");
    // }
    // if((pos = token.find("{")) != string::npos){
    //     token = insert_color_code_for_Bracket(pos,token,color_code[bracket_count++%3],"{");
    // }
    // if((pos = token.find("}")) != string::npos){
    //     token = insert_color_code_for_Bracket(pos,token,color_code[--bracket_count%3],"}");
    // }
    // if((pos = token.find("[")) != string::npos){
    //     token = insert_color_code_for_Bracket(pos,token,color_code[bracket_count++%3],"[");
    // }
    // if((pos = token.find("]")) != string::npos){
    //     token = insert_color_code_for_Bracket(pos,token,color_code[--bracket_count%3],"]");
    // }
    tokens[i] = token;
    return false;
}

bool StringChecker(vector<string> &tokens,int &i){
    int pos = 0;
    string token = tokens[i];
    if((pos = token.find("\"")) != string::npos){
        cout << endl << "token: " << token << endl;
        cout << "pos: " << pos << endl;
        int next_pos = token.substr(pos+1).find("\"") + pos+1;
        if(next_pos == pos){
            string _tmpp = token.substr(0,pos);
            string _tmpm = token.substr(pos);
            string result = _tmpp + "<color=#ce9178>" + _tmpm;
            tokens[i] = result;
            token = tokens[++i];
            while((next_pos = token.find("\"")) == string::npos){
                token = tokens[++i];
            }
            _tmpp = token.substr(0,next_pos+1);
            _tmpm = token.substr(next_pos+1);
            cout << "_tmpp: " << _tmpp << endl;
            cout << "_tmpm: " << _tmpm << endl;
            result = _tmpp + "</color>" + _tmpm;
            tokens[i] = result;
        }else{
            string _tmpp = token.substr(0,pos);
            string _tmpm = token.substr(pos,next_pos - pos + 1);
            string _tmpa = "";
            if(next_pos+1 <= token.length()-1){
                _tmpa = token.substr(next_pos+1,token.length()-1);
            }
            string result = _tmpp + "<color=#ce9178>" + _tmpm + "</color>" + _tmpa;
            tokens[i] = result;
        }
        return true;
    }
    return false;
}



void print_script(vector<string> Tokens){
    int tab_count = 0;
    cout << "Preview:" << endl;
    for(int i = 0; i < Tokens.size(); i++) {
        //;見つけたら改行
        //{見つけたら改行してタブ増やす
        //}見つけたらタブ減らして改行
        string token = Tokens[i];
        int pos = 0;
        if((pos = token.rfind(";")) != string::npos){
            if(pos == token.length()-1){
                cout << token << endl;
                if(Tokens[i+1].find("}") != string::npos){
                    tab_count--;
                    for(int j = 0; j < tab_count; j++)cout << "\t";
                    cout << Tokens[i+1] << endl;
                    i++;
                }
                for(int j = 0; j < tab_count; j++)cout << "\t";
                continue;
            }
        }
        if((pos = token.find("{")) != string::npos){
            cout << token << endl;
            tab_count++;
            if(Tokens[i+1] == "}"){
                tab_count--;
                for(int j = 0; j < tab_count; j++)cout << "\t";
                cout << Tokens[i+1] << endl;
                i++;
            }
            for(int j = 0; j < tab_count; j++)cout << "\t";
            continue;
        }
        regex re(R"(<.*\.h>)");
        if(regex_search(token,re)){
            cout << token << endl;
            continue;
        }
        cout << token << " ";
    }

    cout << endl << "JSON:" << endl;
    for(int i = 0; i < Tokens.size(); i++) {
        string token = Tokens[i];
        int pos = 0;
        if((pos = token.find("\"")) != string::npos){
            token = regex_replace(token,regex("\""),"\\\"");
        }
        if((pos = token.rfind(";")) != string::npos){
            if(pos == token.length()-1){
                cout << token << "\\n";
                if(Tokens[i+1].find("}") != string::npos){
                    tab_count--;
                    for(int j = 0; j < tab_count; j++)cout << "\\t";
                    cout << Tokens[i+1] << "\\n";
                    i++;
                }
                for(int j = 0; j < tab_count; j++)cout << "\\t";
                continue;
            }
        }
        if((pos = token.find("{")) != string::npos){
            cout << token << "\\n";
            tab_count++;
            if(Tokens[i+1] == "}"){
                tab_count--;
                for(int j = 0; j < tab_count; j++)cout << "\\t";
                cout << Tokens[i+1] << "\\n";
                i++;
            }
            for(int j = 0; j < tab_count; j++)cout << "\\t";
            continue;
        }
        regex re(R"(<.*\.h>)");
        if(regex_search(token,re)){
            cout << token << "\\n";
            continue;
        }
        cout << token << " ";
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
        cout << Tokens[i] << " ";
        TokenChecker(Tokens,i);
        StringChecker(Tokens,i);
        BracketChecker(Tokens,i);
        if(DefineIncludeChecker(Tokens,i)){
            i++;
            continue;
        }
    }
    print_script(Tokens);
}

