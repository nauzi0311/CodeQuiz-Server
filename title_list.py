import os
import json

folder_path = "./data/soft1"
title_list_txt = open("./title_list.txt","w",encoding="utf-8")

folders = [f for f in os.listdir(folder_path) if os.path.isdir(os.path.join(folder_path,f))]
folders = folders[:-1]
folders = [int(d) for d in folders]
folders.sort()
folders = [str(d) for d in folders]
folders = [os.path.join(folder_path,f) for f in folders]

for folder in folders:
    files = [os.path.join(folder,f) for f in os.listdir(folder)]
    files = [f.replace("\\","/") for f in files]
    for file in files:
        with open(file,encoding="utf-8") as f:
            data = json.load(f)
            id = data['id']
            title = data['title']
            src = data['source']
            out = data['output']
            title_list_txt.write("[" + str(id) + ":" + title +"] ")
            if src.find("???") != -1 or out.find("???") != -1:
                title_list_txt.write("True\n")
            else:
                title_list_txt.write("False\n")

title_list_txt.close()