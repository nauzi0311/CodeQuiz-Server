import re,json,sys


def main():
    times = sys.argv[1]
    quest = '1' + times + sys.argv[2].zfill(2) + '.json'
    file = './data/soft1/' + times + '/' + quest
    with open(file,"r",encoding="utf-8") as f:
        json_data = json.load(f)
        source = json_data['source']
        ans = json_data['choice'][json_data['answer']-1]
        source = re.sub('(\?\?\?)',ans,source)
        print("before source")
        print(source)
        source = re.sub(r'(<\/?color.*?>)','',source)
        print("after source")
        print(source)

if __name__ == '__main__':
    main()
