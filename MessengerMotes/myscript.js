const ttv_emotes_url = chrome.runtime.getURL('ttv_mappings.json')
const bttv_emotes_url = chrome.runtime.getURL('bttv_mappings.json')

var ttv_toggle, bttv_toggle
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.key == "ttv_toggle") {
            ttv_toggle = request.newVal
        } else if (request.key == "bttv_toggle") {
            bttv_toggle = request.newVal
        } else if (request.key == "init") {
            ttv_toggle = request.payload.ttv_toggle
            bttv_toggle = request.payload.bttv_toggle
        }
        sendResponse({ result: "changed" });
    });

fetch(ttv_emotes_url)
    .then((response) => {
        return response.json()
    })
    .then(json => {
        ttv_emotes = json
    })

fetch(bttv_emotes_url)
    .then((response) => {
        return response.json()
    })
    .then(json => {
        bttv_emotes = json
    })

function injectEmojis() {
    var observer = new MutationObserver(subscriber);
}

var observer = new MutationObserver(subscriber);

function addObserverIfDesiredNodeAvailable() {
    var main_element = document.querySelector("div._4sp8")
    if (!main_element) {
        // wait for main element to load
        window.setTimeout(addObserverIfDesiredNodeAvailable, 100);
        return;
    }
    observer.observe(main_element, {
        subtree: true,
        attributes: false,
        childList: true
    });
}
addObserverIfDesiredNodeAvailable();

function subscriber(mutations) {
    mutations.forEach((mutation) => {
        if (mutation.target.className == '_41ud' && mutation.target.tagName == 'DIV')
            setTimeout(function () {
                replaceTextWithEmotes(mutation.target.children)
            }, 500);
    });
}

function replaceTextWithEmotes(elements) {
    for (const element of elements) {
        if (element.className.includes('clearfix _o46 _3erg')) {
            let textElement;
            try {
                textElement = element.children[0].children[1].children[0]
            }
            catch (err) {
                continue
            }

            let text = textElement.innerHTML;
            let words = text.split(" ");
            let emote_present = false;
            words.map(function (item, i) {
                if (item != "" && item in ttv_emotes && ttv_toggle) {
                    words[i] = "<img src=\"" + ttv_emotes[item] + "\">"
                    emote_present = true
                }
                else if (item != "" && item in bttv_emotes && bttv_toggle) {
                    words[i] = "<img src=\"" + bttv_emotes[item] + "\">"
                    emote_present = true
                }
            })
            if (emote_present) {
                textElement.innerHTML = words.join(" ")
            }
        }
    }
}