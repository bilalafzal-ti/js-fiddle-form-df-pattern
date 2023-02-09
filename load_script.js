// * this is the script that loads up the UI and
const CLOUDFRONT_LINKS = {
    js: 'https://d2aeb2yxzez2nt.cloudfront.net/script.js',
    css: 'https://d2aeb2yxzez2nt.cloudfront.net/styles.css',
};

function loadFonts() {
    var font = document.createElement('link');
    font.rel = 'stylesheet';
    font.href =
        'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap';
    document.head.appendChild(font);
}

function loadStyles() {
    var style = document.createElement('link');
    style.rel = 'stylesheet';
    style.href = CLOUDFRONT_LINKS['css'];
    document.head.appendChild(style);
}

function loadScripts() {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = CLOUDFRONT_LINKS['js'];
    document.body.appendChild(script);
}

function createUIChecker() {
    var div = document.createElement('div');
    div.id = 'df-patterns-forms';
    document.body.appendChild(div);
}

function loadUI() {
    var idDiv = document.getElementById('df-patterns-forms');
    if (idDiv) {
        return;
    }
    createUIChecker();
    loadStyles();
    loadFonts();
    loadScripts();
}

window.addEventListener('DOMContentLoaded', (event) => {
    loadUI();
});
