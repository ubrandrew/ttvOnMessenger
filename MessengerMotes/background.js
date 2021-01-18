// Function that sends data into the content_scripts
// currently unused
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

// async function to load json into memory
async function getMappings(url) {
    return fetch(url)
        .then((response) => {
            return response.json()
        })
}

// async function to consolidate emote dicstionaries from different sources
// logic to handle identical emotes handled here (if rank diff is > 200, use lower ranked emote)
async function consolidateMappings(mappingsList) {
    consolidated_map = {}
    for (mapping of mappingsList) {
        let temp_mapping = await getMappings(mapping)
        for (key in temp_mapping) {
            consolidated_map[key] = temp_mapping[key]
            // if (!(key in consolidated_map)) {
            //     consolidated_map[key] = temp_mapping[key]
            // } else if (consolidated_map[key].rank - temp_mapping[key].rank > 200) {
            //     console.log(`CHOSE ${key} from ${temp_mapping[key].class} over ${consolidated_map[key].class}`)
            //     consolidated_map[key] = temp_mapping[key]
            // } else {
            //     console.log(`CHOSE ${key} from ${consolidated_map[key].class} over ${temp_mapping[key].class}`)
            // }
        }
    }
    return consolidated_map
}

// function that parses json objects into chrome LOCAL storage
async function loadMappingsIntoChromeStorage(sourceList) {
    var num = 0
    consolidateMappings(sourceList).then((map) => {
        for (key in map) {
            chrome.storage.local.set({ [key]: map[key] }, function () {
                // num++;
                // console.log("added " + key + ", " + num)
            })
        }
    })
}


// Listener that triggers when the chrome extension is installed
// Initializes settings 
chrome.runtime.onInstalled.addListener(function () {
    chrome.storage.local.clear();
    const ttv_emotes_url = chrome.runtime.getURL('ttv_mappings.json')
    const bttv_emotes_url = chrome.runtime.getURL('bttv_mappings.json')
    const ffz_emotes_url = chrome.runtime.getURL('ffz_mappings.json')

    chrome.storage.sync.set({ ttv_toggle: true, bttv_toggle: true, ffz_toggle: true, label_toggle: true }, function () {
        console.log('Value is set to ' + true);
    });
    loadMappingsIntoChromeStorage([ffz_emotes_url, bttv_emotes_url, ttv_emotes_url])
});

console.log("background running")