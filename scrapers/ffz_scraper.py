import requests
import json

PAGES = 15
emotes = []
for i in range(PAGES):
    endpoint = f'https://api.frankerfacez.com/v1/emoticons?_sceheme=https&page={i+1}&sort=count-desc'
    r = requests.get(endpoint)
    emotes += r.json()['emoticons']

parsed_emotes = {}
rank = 1
for emote in emotes:
    if emote["name"] not in parsed_emotes:
        enabled = True if rank < 300 else False
        parsed_emotes[emote["name"]] = {
            "source": "https:" + emote["urls"]["1"],
            "class": "ffz",
            "enabled": enabled,
            "rank": rank
        }
        rank += 1

print(parsed_emotes)
print(len(parsed_emotes.keys()))
with open('ffz_mappings.json', 'w') as fp:
    json.dump(parsed_emotes, fp)
