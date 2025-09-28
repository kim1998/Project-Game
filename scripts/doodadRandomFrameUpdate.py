import json
import random

path = 'E:\RPG Maker MZ 1.8.0\Projects\Project Game\data\Doodads.json'

with open(path, 'r') as file:
    data = json.load(file)
    for i in data:
        if i is not None:  # Check if the object is not null
            for obj in i:
                if obj is not None:
                    obj["frameUpdate"] = random.randint(25, 90)

with open(path, 'w') as fileOut:
    fileOut.write(json.dumps(data, indent=4))