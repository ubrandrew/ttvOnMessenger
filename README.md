
# MessengerMotes
**Messenger Motes is a chrome extension that lets you use Twitch, BetterTTV, and FrankerFaceZ emotes on Facebook Messenger.**  
By default, only the top emotes are enabled but you can navigate to the popup to configure settings for emotes individually. 

To run a local instance of this project, run the `build.sh` script to build the project (contents of the build project are in the `MessengerMotesBuild` folder.

Then, navigate to [chrome://extensions/](chrome://extensions/), enable developer mode, click "load unpacked", then select the `MessengerMotesBuild` folder.

## Emote Injector
The content script `emoteInjector.js` and the background script `background.js` are the main logic behind emote injection. These files, along with all other necessary chrome extension files are located in the `MessengerMotes` directory. This could be used as a standalone extension without a popup.

## Extension Popup
The popup for the extension is located in the directory named `ttvmotes` (should probably rename to `popup`). It's a create-react-app project that uses material-ui components (documentation [here](https://material-ui.com/)). Yarn commands are standard (you can navigate into the `ttvmotes` directory to see the readme specifying the commands)

**Note**: If you want to serve the popup as a standalone React app, you need to disable/comment out any lines that interact with chrome.storage (and chrome in general). 


