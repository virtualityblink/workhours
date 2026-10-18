import json

class jfile:

    def read(file_name):
        with open(file_name, "r", encoding="utf-8") as file:
            return json.load(file)

    def write(file_name, data):
        with open(file_name, "w", encoding="utf-8") as file:
            json.dump(data, file, ensure_ascii=False, indent=2)

    def create(file_name, data):
        with open(file_name, "x", encoding="utf-8") as file:
            json.dump(data, file, ensure_ascii=False, indent=2)