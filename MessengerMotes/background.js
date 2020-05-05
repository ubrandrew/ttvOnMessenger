// Function that sends data into the content_scripts
function sendMessageToAllMessengerTabs(setting, message) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(
            tabs[0].id,
            {
                key: setting,
                payload: message
            },
            function () { });
    });
}

// function that parses json objects into chrome LOCAL storage
function loadMappingsIntoChromeStorage(sourceList) {
    for (source of sourceList) {
        fetch(source)
            .then((response) => {
                return response.json()
            })
            .then(json => {
                for (emote in json) {
                    chrome.storage.local.set({ [emote]: json[emote] }, function () { })
                }
            })
    }
}

// function that returns settings from chrome storage
async function getSettings() {
    return new Promise(function (resolve, reject) {
        chrome.storage.sync.get(['ttv_toggle', 'bttv_toggle'], (data) => {
            resolve({
                ttv_toggle: data.ttv_toggle,
                bttv_toggle: data.bttv_toggle,
            });
        })
    })
}

// TODO: onUpdated isnt specific to inital page loads (also, look into what tabs are watched, how theyre watched, etc)
//       Something to refactor
// Instatiating a LISTENER to fire when tab updates (used to initialize settings)
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status == 'complete') {
        getSettings().then((value) => {
            sendMessageToAllMessengerTabs('init', value);
        })
    }
});

// Listener that triggers when the chrome extension is installed
// Initializes settings 
chrome.runtime.onInstalled.addListener(function () {
    const ttv_emotes_url = chrome.runtime.getURL('ttv_mappings.json')
    const bttv_emotes_url = chrome.runtime.getURL('bttv_mappings.json')

    chrome.storage.sync.set({ ttv_toggle: true, bttv_toggle: true }, function () {
        console.log('Value is set to ' + true);
    });
    loadMappingsIntoChromeStorage([ttv_emotes_url])
});

console.log("background running")