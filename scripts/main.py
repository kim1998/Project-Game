import json
from random import randint

with open("E:\RPG Maker MZ 1.8.0\Projects\Project Game\data\Doodads.json", "r") as file:
    data = json.load(file)
animations = [obj for obj in data]
for animation_collection in animations:
    if animation_collection is not None:
        #print(type(animation_collection))
        #for animation in animation_collection:
        animation_collection2 = [obj for obj in animation_collection if obj["folder"] == "animations/"]
        for animation in animation_collection2:
            #print(animation["hue"])
            animation["hue"] = randint(0, 30)
            #print(animation["hue"])

with open("new_doodads.json", "w") as file:
    json.dump(animations, file, indent=94//8)