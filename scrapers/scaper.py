from selenium import webdriver 
from selenium.webdriver.common.by import By 
from selenium.webdriver.support.ui import WebDriverWait 
from selenium.webdriver.support import expected_conditions as EC 
from selenium.common.exceptions import TimeoutException
import re

option = webdriver.ChromeOptions()
option.add_argument("-incognito")
browser = webdriver.Chrome(executable_path='/Users/andrew/Downloads/chromedriver', chrome_options=option)
browser.get("https://betterttv.com/emotes/top")

import time
SCROLL_PAUSE_TIME = 1
# Get scroll height
last_height = browser.execute_script("return document.body.scrollHeight")

while True:
    # Scroll down to bottom
    browser.execute_script("window.scrollTo(0, document.body.scrollHeight);")

    # Wait to load page
    time.sleep(SCROLL_PAUSE_TIME)

    # Calculate new scroll height and compare with last scroll height
    new_height = browser.execute_script("return document.body.scrollHeight")
    if new_height == last_height:
        break
    last_height = new_height

elements = browser.find_elements_by_class_name("EmoteCards_emoteCard__Z9ryt")
re_src = r'<img class="EmoteCards_emoteCardImage__3AjVX" src="(.*)" alt="">'
re_name = r'<div class="EmoteCards_emoteCardCode__2Ro8G">(.[^<>]*)</div>'

mapping = {}
rank = 1
for element in elements:
    inner = element.get_attribute('innerHTML')
    img_src = re.search(re_src, inner).group(1)[:-2] + '1x'
    name = re.search(re_name, inner).group(1)
    if name not in mapping:
        enabled = True if rank < 300 else False
        mapping[name] = {
            "source": img_src,
            "class": "bttv",
            "enabled": enabled,
            "rank": rank
        } 
        rank += 1

import json

with open('bttv_mappings.json', 'w') as fp:
    json.dump(mapping, fp)


