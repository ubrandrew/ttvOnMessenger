const emotes = {
    "😍": chrome.runtime.getURL("images/kappapride.png"),
    "😆": chrome.runtime.getURL("images/KEKW.png"),
    "😮": chrome.runtime.getURL("images/Pog.png"),
    "😢": chrome.runtime.getURL("images/widePeepoSad.png"),
    "POGSLIDE": chrome.runtime.getURL("images/pogslide.gif"),
    "sumSmash": chrome.runtime.getURL("images/sumsmash.gif"),
    "KappaPride": chrome.runtime.getURL("images/kappapride.png"),
    "POGGERS": chrome.runtime.getURL("images/poggers.png"),
    "Pog": chrome.runtime.getURL("images/Pog.png"),
    "monkaSHAKE": chrome.runtime.getURL("images/monkashake.gif"),
    "pepeJAM": chrome.runtime.getURL("images/pepejam.gif"),
    "Clap": chrome.runtime.getURL("images/clap.gif"),
    "OMEGALUL": chrome.runtime.getURL("images/omegalul.png"),
    "monkaS": chrome.runtime.getURL("images/monkas.png"),
    "PepeHands" :chrome.runtime.getURL("images/pepehands.png"),
    "EZ": chrome.runtime.getURL("images/ez.png"),
    "gachiBASS": chrome.runtime.getURL("images/gachibass.gif"),
    "HYPERS": chrome.runtime.getURL("images/hypers.png"),
    "PepoDance" : chrome.runtime.getURL("images/pepodance.gif"),
    "ppHop": chrome.runtime.getURL("images/pphop.gif"),
    "ppOverheat": chrome.runtime.getURL("images/ppoverheat.gif"),
    "ricardoFlick": chrome.runtime.getURL("images/ricardoflick.gif")
}
window.onload=function(e){
    this.replaceEmojis()
}

var observer = new MutationObserver(function(mutations, observer) {
    console.log("updated")
    replaceEmojis()
});
var main_element = document.querySelector("html>body>div")
observer.observe(main_element, {
  subtree: true,
  attributes: false,
  childList: true
});

function replaceEmojis(){
    setTimeout(function(){
        replaceEmotes()
        replaceText()
    }, 50);
}

function replaceEmotes() {
    var imgs = document.getElementsByTagName("img")
    for (var i = 0; i < imgs.length; i++) {
        if (imgs[i].alt in emotes){
            imgs[i].src = emotes[imgs[i].alt]
        }
    }
}

function replaceText() {
    var text = "";
    if (document.URL.includes("facebook")){
        text = document.querySelectorAll("span._5yl5>span")
    } else if (document.URL.includes("messenger")){
        text = document.getElementsByClassName("_3oh- _58nk")
    }
    for (var i = 0; i < text.length; i++) {
        var words = text[i].innerText.split(" ");
        var emote_present = false;
        words.map(function(item, i) {
            if(item in emotes) {
                words[i] = "<img src=\"" + emotes[item] + "\">"
                emote_present = true
            }
        })
        if (emote_present) {
            text[i].innerHTML = words.join(" ")
        }
    } 
}