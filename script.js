// The theme button is on both pages.
const themeButton = document.querySelector("#theme-toggle");

themeButton.addEventListener("click", function () {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        themeButton.textContent = "Switch to light mode";
    } else {
        themeButton.textContent = "Switch to dark mode";
    }
});

// The greeting form is on the home page.
const greetingForm = document.getElementById("greeting-form");

if (greetingForm) {
    const nameInput = document.getElementById("visitor-name");
    const greetingResult = document.getElementById("greeting-result");

    greetingForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const name = nameInput.value.trim();

        if (name === "") {
            greetingResult.textContent = "Please enter your name first.";
        } else {
            greetingResult.textContent = "Hello, " + name + "! Welcome to Neon City.";
        }
    });
}

// The random fact button is on the classified page.
const factButton = document.getElementById("fact-button");

if (factButton) {
    const facts = [
        "I keep three spare chargers in my backpack but forget to charge my own phone.",
        "The Deadline Breaker is too big to fit on the bus, so I usually walk.",
        "I tried fixing the same headphones four times. They still only work on one side.",
        "I once followed a distress signal and found a vending machine with no snacks left.",
        "My friend names every piece of equipment. Deadline Breaker is the only name I kept.",
        "I practise heroic speeches in my head and forget them when I have to speak."
    ];
    const factResult = document.getElementById("fact-result");

    factButton.addEventListener("click", function () {
        const index = Math.floor(Math.random() * facts.length);
        factResult.textContent = facts[index];
    });
}
