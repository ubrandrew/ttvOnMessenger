// Listener that listens for settings changes (keep settings in memory because callbacks are confusing...)
// TODO: Look into caching emotes (to reduce async calls to chrome storage? is this expensive?)
// init is necessary because storage watcher doesnt trigger on newly created keys
// CURRENTLY UNUSED BUT KEEPING FOR FUTURE USE
// chrome.runtime.onMessage.addListener(
//     function (request, sender, sendResponse) {
//         if (request.key == "init") {
//             ttv_toggle = request.payload.ttv_toggle
//             bttv_toggle = request.payload.bttv_toggle
//         }
//         sendResponse("done")
//         return true
//     });

// MSG_SURROUNDING_TAG_CLASS surrounds the DIV containing the actual text / message
const THEMED_MSG_SURROUNDING_TAG_CLASS = 'lm2lsiji';
const UNTHEMED_MSG_SURROUNDING_TAG_CLASS = 'ljqsnud1 qv66sw1b'

// main element is the root of the page (data-pagelet = root)
const MAIN_SELECTOR_TO_WATCH = "div[data-pagelet='root']"
const PROCESSED_TAG = 'mm-processed'

function getAllUnprocessedMessages() {
    var msgs = document.getElementsByClassName(UNTHEMED_MSG_SURROUNDING_TAG_CLASS)
    var themedMsgs = document.getElementsByClassName(THEMED_MSG_SURROUNDING_TAG_CLASS)
    var compiledMsgs = [...msgs].concat([...themedMsgs])
    return compiledMsgs.filter((ele) => {
        return !ele.hasAttribute(PROCESSED_TAG)
    })
}

// Function that is called when mutations are observed
// Checks if mutated element is a fb message, then resplaces
function chatSubscriber(mutations) {
    if (ttv_toggle || bttv_toggle || ffz_toggle) {
        mutations.forEach(mutation => {
            if (mutation.addedNodes.length) {
                try {
                    var addedNode = mutation.addedNodes[0];
                    var chatEle = addedNode.getElementsByClassName("ljqsnud1 qv66sw1b").length ? addedNode.getElementsByClassName("ljqsnud1 qv66sw1b") : addedNode.getElementsByClassName("lm2lsiji");
                    
                     if (chatEle && chatEle.length){
                        processElements(chatEle);
                    }
                } catch (e) {
                }
            }
        });
    }
}

function processElements(elements) {
    [...elements].forEach(element => {
        replaceTextWithEmotes(element);
    });
}

// function that waits for root element loads (checks every 100ms)
function addObserverIfDesiredNodeAvailable(observer, elementSelectorString) {
    var element = document.querySelector(elementSelectorString)
    if (!element) {
        window.setTimeout(addObserverIfDesiredNodeAvailable, 500, observer, elementSelectorString);
        return;
    }
    observer.observe(element, {
        subtree: true,
        childList: true,
        attributes: false
    });
}

function replaceTextWithEmotes(element) {
    try {
        let textElement = element.children[0];
        let words = textElement.innerHTML.split(" ");
        processWordList(words).then((data) => {
            textElement.innerHTML = data.join(" ");
        });
        let att = document.createAttribute(PROCESSED_TAG);
        textElement.setAttributeNode(att);
    }
    catch (err) {
        return;
    }
}

// Takes a wordlist and modifies in place
async function processWordList(words) {
    for (let [i, word] of words.entries()) {
        try {
            let source = await getEmoteSource(word);
            words[i] = buildEmote(word, source[word]);
        } catch (err) {
            // emote doesnt exist
            continue;
        }
    }
    return words;
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

// Generates emote HTML element -- refactor
function buildEmote(word, source) {
    if (!source.enabled) return word
    if ((source.class === 'ttv' && ttv_toggle) ||
        (source.class === 'bttv' && bttv_toggle) ||
        (source.class === 'ffz' && ffz_toggle)) {
        var tag = document.createElement("div");
        tag.className = 'mm-msg tooltip ' + source.class + ' ' + word;
        tag.id = encodeURIComponent(word);
        var img = document.createElement("img")
        img.className = "tooltip";
        img.alt = word;
        img.title = word;
        img.src = source.source
        var span = document.createElement("span");
        span.className = label_toggle ? 'tooltiptext' : 'tooltiptext-disabled'
        span.innerText = word
        tag.appendChild(img);
        tag.appendChild(span);
        return tag.outerHTML
    } else {
        return word
    }
}

// Gets all messages and replaces words (instead of observed mutations only)
// Triggered by settings toggle
function processCurrentPage() {
    var messages = getAllUnprocessedMessages();
    messages.forEach((msg) => {
        replaceTextWithEmotes(msg)
    });
}

function toggleEmoteClass(className, show) {
    if (show) {
        processCurrentPage()
    } else {
        var emotes = document.querySelectorAll(`div.${className}`);
        for (emote of emotes) {
            emote.parentNode.replaceChild(document.createTextNode(emote.id), emote);
        }
    }
}

// Instantiating a LISTENER to listen to state changes.
// If extension settings change, send message to update contentscript settings
chrome.storage.onChanged.addListener(function (changes, namespace) {
    for (var key in changes) {
        var storageChange = changes[key];
        switch (key) {
            case "ttv_toggle":
                ttv_toggle = storageChange.newValue;
                toggleEmoteClass("ttv", ttv_toggle)
                break;
            case "bttv_toggle":
                bttv_toggle = storageChange.newValue;
                toggleEmoteClass("bttv", bttv_toggle)
                break;
            case "ffz_toggle":
                ffz_toggle = storageChange.newValue;
                toggleEmoteClass("ffz", ffz_toggle)
                break;
            case "label_toggle":
                label_toggle = storageChange.newValue;
                if (label_toggle) {
                    var tooltips = document.querySelectorAll('span.tooltiptext-disabled');
                    for (tooltip of tooltips) {
                        tooltip.className = 'tooltiptext'
                    }
                } else {
                    var tooltips = document.querySelectorAll('span.tooltiptext');
                    for (tooltip of tooltips) {
                        tooltip.className = 'tooltiptext-disabled'
                    }
                }
                break;
            default:
                try {
                    if (storageChange.newValue.enabled) {
                        processCurrentPage()
                    } else {
                        // Copy array 
                        var emotes = Array.prototype.slice.call(document.getElementsByClassName(key));
                        for (emote of emotes) {
                            emote.parentNode.replaceChild(document.createTextNode(emote.id), emote);
                        }
                    }
                } catch (err) {
                    console.log(err)
                }
        }
    }
});


// function that returns settings from chrome storage
async function getSettings() {
    return new Promise(function (resolve, reject) {
        chrome.storage.sync.get(['ttv_toggle', 'bttv_toggle', 'ffz_toggle', 'label_toggle'], (data) => {
            resolve(data);
        })
    })
}

// START SCRIPT
var ttv_toggle, bttv_toggle, ffz_toggle, label_toggle
getSettings().then((value) => {
    ttv_toggle = value.ttv_toggle;
    bttv_toggle = value.bttv_toggle;
    ffz_toggle = value.ffz_toggle;
    label_toggle = value.label_toggle;
    var chatObserver = new MutationObserver(chatSubscriber);
    addObserverIfDesiredNodeAvailable(chatObserver, "div[data-pagelet='root']");
})
