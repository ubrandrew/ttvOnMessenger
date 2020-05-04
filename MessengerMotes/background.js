function sendMessageToAllMessengerTabs(setting, message) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        console.log(tabs)
        chrome.tabs.sendMessage(
            tabs[0].id,
            {
                key: setting,
                newVal: message
            },
            function (response) {
                console.log(response);
            });
    });
}

function loadMappingsIntoChromeStorage(sourceList) {
    for (source of sourceList) {
        fetch(source)
            .then((response) => {
                return response.json()
            })
            .then(json => {
                for (emote in json) {
                    chrome.storage.local.set({ emote: json[emote] }, function () { })
                }
            })
    }
}

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

chrome.storage.onChanged.addListener(function (changes, namespace) {
    for (var key in changes) {
        var storageChange = changes[key];
        if (key === "ttv_toggle" || key === "bttv_toggle") {
            sendMessageToAllMessengerTabs(key, storageChange.newValue)
        }
    }
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status == 'complete') {
        getSettings().then((value) => {
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, { key: "init", payload: value }, function (response) { });
            });
        })
    }
});

chrome.runtime.onInstalled.addListener(function () {
    const ttv_emotes_url = chrome.runtime.getURL('ttv_mappings.json')
    const bttv_emotes_url = chrome.runtime.getURL('bttv_mappings.json')

    chrome.storage.sync.set({ ttv_toggle: true, bttv_toggle: true }, function () {
        console.log('Value is set to ' + true);
    });
    sendMessageToAllMessengerTabs('ttv_toggle', true)
    sendMessageToAllMessengerTabs('bttv_toggle', true)
    loadMappingsIntoChromeStorage([ttv_emotes_url, bttv_emotes_url])
});


console.log("background running")
