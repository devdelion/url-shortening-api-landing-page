// Mobile menu
let burger = document.querySelector('.js-burger'),
    menu = document.querySelector('.js-menu');

burger.addEventListener('click', function () {
    menu.classList.toggle('open');
})



// Copy short link
function copyToClipboard(button) {
    var range = document.createRange();
    range.selectNode(button.parentNode.querySelectorAll('.shortener__shortURL')[0]);

    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();

    button.classList.add('button--copied');
    button.innerHTML = 'Copied!';
}

// Add link box
function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function appendURLblocks(longURL, shortURL) {
    let generatedLink = document.createElement('div'),
        shortener = document.querySelectorAll('.shortener')[0];

    generatedLink.className = "shortener__URLBlock";
    generatedLink.innerHTML =
        '<div class="container">' +
        '<div class="shortener__generatedURL">' +
        '<div class="shortener__longURL">' + longURL + '</div>' +
        '<div class="shortener__shortURL">' + shortURL + '</div>' +
        '<button type="button" class="shortener__button--small button button--square" onclick="copyToClipboard(this);">Copy</button>' +
        '</div></div>';

    insertAfter(generatedLink, shortener);
}

// Check url validity
let form = document.forms.shortener,
    url = form.url,
    err = document.querySelectorAll('.shortener__error')[0];

url.addEventListener('input', function (e) {
    if (!this.validity.valid) {
        err.classList.add('active');
    } else {
        err.classList.remove('active');
    }
});

// Shortener
form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (url.validity.valid && url.value) {
        const longURL = new URL('https://api.shrtco.de/v2/shorten');
        let xhr = new XMLHttpRequest();

        longURL.searchParams.set('url', url.value);

        xhr.open('GET', longURL);
        xhr.onload = function () {
            const response = JSON.parse(xhr.responseText);

            if (response.ok) {
                appendURLblocks(response.result.original_link, response.result.full_short_link);
            } else {
                console.log(xhr.status + ': ' + xhr.statusText);
            }
        };
        xhr.send();
    } else {
        alert('Wrong URL');
    }
})
