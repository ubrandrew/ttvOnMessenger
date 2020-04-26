const ttv_emotes_url = chrome.runtime.getURL('ttv_mappings.json')
const bttv_emotes_url = chrome.runtime.getURL('bttv_mappings.json')

let ttv_emotes, bttv_emotes

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
            }, 1000);
    });
}

function replaceTextWithEmotes(elements) {
    for (const element of elements) {
        if (element.className.includes('clearfix _o46 _3erg')) {
            var textElement = element.children[0].children[1].children[0]
            var text = textElement.innerHTML;

            var words = text.split(" ");
            var emote_present = false;
            words.map(function (item, i) {
                if (item != "" && item in ttv_emotes) {
                    words[i] = "<img src=\"" + ttv_emotes[item] + "\">"
                    emote_present = true
                }
                else if (item != "" && item in bttv_emotes) {
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