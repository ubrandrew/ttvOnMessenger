from selenium import webdriver 
from selenium.webdriver.common.by import By 
from selenium.webdriver.support.ui import WebDriverWait 
from selenium.webdriver.support import expected_conditions as EC 
from selenium.common.exceptions import TimeoutException
import re

option = webdriver.ChromeOptions()
option.add_argument("-incognito")
browser = webdriver.Chrome(executable_path='/Users/andrew/Downloads/chromedriver', chrome_options=option)
browser.get("https://twitchemotes.com/")

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


elements = browser.find_elements_by_class_name("emote")

re_src = r'<img src="(.*)" data-tooltip="<strong>(.[^<>]*)</strong>" data-regex="4Head"'

mapping = {}
for element in elements:
    img_src = element.get_attribute('src')
    name = element.get_attribute('data-tooltip')[8:-9]
    mapping[name] = img_src
    print(name, img_src)

import json

with open('ttv_mappings.json', 'w') as fp:
    json.dump(mapping, fp)





