
// Listener that listens for settings changes (keep settings in memory because callbacks are confusing...)
// TODO: Look into caching emotes (to reduce async calls to chrome storage? is this expensive?)
var ttv_toggle, bttv_toggle
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.key == "init") {
            ttv_toggle = request.payload.ttv_toggle
            bttv_toggle = request.payload.bttv_toggle
        }
        sendResponse("done")
        return true
    });

// function that waits for root element loads (checks every 100ms)
function addObserverIfDesiredNodeAvailable(observer) {
    var main_element = document.querySelector("div._4sp8")
    if (!main_element) {
        window.setTimeout(addObserverIfDesiredNodeAvailable, 100);
        return;
    }
    observer.observe(main_element, {
        subtree: true,
        attributes: false,
        childList: true
    });
}

// Function that is called when mutations are observed
// Checks if mutated element is a fb message, then resplaces
function subscriber(mutations) {
    mutations.forEach((mutation) => {
        if (mutation.target.className == '_41ud' && mutation.target.tagName == 'DIV' && ttv_toggle)
            setTimeout(() => {
                replaceTextWithEmotes(mutation.target.children)
            }, 100);
    });
}

async function replaceTextWithEmotes(elements) {
    for (const element of elements) {
        if (element.className.includes('clearfix _o46 _3erg')) {
            let textElement;
            try {
                textElement = element.children[0].children[1].children[0]
            }
            catch (err) {
                continue
            }
            let words = textElement.innerHTML.split(" ");
            processWordList(words).then((data) => {
                textElement.innerHTML = data.join(" ")
            })
        }
    }
}

async function processWordList(words) {
    for (let [i, word] of words.entries()) {
        try {
            let source = await getEmoteSource(word);
            words[i] = "<img src=\"" + source[word] + "\" alt=\"" + word + "\" class=\"messengerMoteTag\">"
        } catch (err) {
            continue
        }
    }
    return words
}

// Retrieves emote source from chrome.storage
async function getEmoteSource(emote) {
    return new Promise(function (resolve, reject) {
        chrome.storage.local.get(emote, (data) => {
            if (Object.keys(data).length !== 0) {
                resolve(data)
            } else {
                reject("emote does not exist")
            }
        });
    });
}

// Instantiating a LISTENER to listen to state changes.
// If extension settings change, send message to update contentscript settings
chrome.storage.onChanged.addListener(function (changes, namespace) {
    for (var key in changes) {
        var storageChange = changes[key];
        if (key === "ttv_toggle") {
            ttv_toggle = storageChange.newValue
        } else if (key === "bttv_toggle") {
            bttv_toggle = storageChange.newValue
        }
    }
});


// START SCRIPT
var observer = new MutationObserver(subscriber);
addObserverIfDesiredNodeAvailable(observer);

