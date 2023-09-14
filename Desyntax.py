import re,json,sys


def main(times,qu):
    quest = '1' + times + qu.zfill(2) + '.json'
    file = './data/soft1/' + times + '/' + quest
    with open(file,"r",encoding="utf-8") as f:
        json_data = json.load(f)
        source = json_data['source']
        ans = json_data['choice'][json_data['answer']-1]
        print("before source")
        print(source)
        source = re.sub(r'(<\/?color.*?>)','',source)
        print("after source")
        print(source)
        if re.search('(\?\?\?)',source) is None:
            print("Ans")
            print(source)
            print("Out")
            print(json_data['output'])
        else:
            source_ans = re.sub('(\?\?\?)',ans,source)
            print("Ans")
            print(source_ans)
        return source

if __name__ == '__main__':
    main(sys.argv[1],sys.argv[2])
