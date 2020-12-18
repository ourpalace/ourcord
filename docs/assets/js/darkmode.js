//jshint esversion: 8
let dark = false;

function SwitchTheme() {
    var link = document.getElementById("lnk");
    if (dark === true) {
        dark = false;
        link.setAttribute("href", "assets/css/main.css");
    } else if (dark === false) {
        dark = true;
        link.setAttribute("href", "assets/css/dark.css");
    } else {
        dark = false;
        return window.alert("Cannot change theme");
    }
}