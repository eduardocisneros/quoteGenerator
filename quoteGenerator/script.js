const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const xBtn = document.getElementById("x");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

/* Show Loading */
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

/* Hide Loading */
function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

/* Show New Quote */
function newQuote() {
    loading();
    /* Pick a random quote from apiQuotes array */
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    /* Check if Author field is blank and remplace it with */
    if (!quote.author) {
        authorText.textContent = "Unknown";
    } else {
        authorText.textContent = quote.author;
    }
    /* Check Quote length to determe styling */
    if (quote.text.length > 120) {
        quoteText.classList.add("long-quote");
    } else {
        quoteText.classList.remove("long-quote");
    }
    /* Ser Quote, Hide Loader */
    quoteText.textContent = quote.text;
    complete();
}

/* Get Quotes From API */
async function getQuotes() {
    loading();
    const apiUrl = "https://type.fit/api/quotes";
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        /* Catch Error Here */
    }
}

/* X Quote */
function xQuote() {
    const xUrl = `https://twitter.com/intent/follow?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(xUrl, "_blank");
}

/* Event Listeners */
newQuoteBtn.addEventListener("click", newQuote);
xBtn.addEventListener("click", xQuote);

/* On Load */
getQuotes();


