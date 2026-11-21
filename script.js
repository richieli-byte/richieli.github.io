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

// This small turn-based battle is on the classified page.
const battleForm = document.getElementById("battle-form");

if (battleForm) {
    const heroNameInput = document.getElementById("hero-name-input");
    const heroLabel = document.getElementById("hero-label");
    const heroHP = document.getElementById("hero-hp");
    const enemyHP = document.getElementById("enemy-hp");
    const potionCount = document.getElementById("potion-count");
    const battleStatus = document.getElementById("battle-status");
    const battleLog = document.getElementById("battle-log");
    const attackButton = document.getElementById("attack-button");
    const potionButton = document.getElementById("potion-button");

    // This object keeps the game state separate from what is shown on the page.
    const battle = {
        heroName: "",
        heroHP: 18,
        enemyHP: 20,
        potions: 1,
        active: false
    };

    function showBattle() {
        if (battle.heroName === "") {
            heroLabel.textContent = "Your hero";
        } else {
            heroLabel.textContent = battle.heroName;
        }
        heroHP.textContent = "HP: " + battle.heroHP + " / 18";
        enemyHP.textContent = "HP: " + battle.enemyHP + " / 20";
        potionCount.textContent = "Potions: " + battle.potions;
    }

    function addBattleMessage(message) {
        const newLine = document.createElement("li");
        newLine.textContent = message;
        battleLog.prepend(newLine);

        // Only keep the latest five lines on the screen.
        if (battleLog.children.length > 5) {
            battleLog.lastChild.remove();
        }
    }

    function takeTurn(action) {
        if (!battle.active) {
            if (battle.heroName === "") {
                battleStatus.textContent = "Enter a hero name and start a battle first.";
            } else {
                battleStatus.textContent = "The battle is over. Start another battle to play again.";
            }
            return;
        }

        if (action === "attack") {
            const damage = Math.floor(Math.random() * 3) + 5;
            battle.enemyHP -= damage;
            if (battle.enemyHP < 0) {
                battle.enemyHP = 0;
            }
            addBattleMessage(battle.heroName + " attacks with the Deadline Breaker for " + damage + " damage.");

            if (battle.enemyHP === 0) {
                battle.active = false;
                battleStatus.textContent = "You won! Start another battle to play again.";
                addBattleMessage("Static Wisp defeated!");
                showBattle();
                return;
            }
        } else if (action === "potion") {
            if (battle.potions === 0) {
                battleStatus.textContent = "You have no potions left.";
                return;
            }
            if (battle.heroHP === 18) {
                battleStatus.textContent = "Your HP is already full.";
                return;
            }
            battle.potions -= 1;
            battle.heroHP += 10;
            if (battle.heroHP > 18) {
                battle.heroHP = 18;
            }
            addBattleMessage(battle.heroName + " uses a potion and heals.");
        }

        // The wisp takes its turn after either player action.
        const enemyDamage = Math.floor(Math.random() * 3) + 4;
        battle.heroHP -= enemyDamage;
        if (battle.heroHP < 0) {
            battle.heroHP = 0;
        }
        addBattleMessage("Static Wisp shocks " + battle.heroName + " for " + enemyDamage + " damage.");

        if (battle.heroHP === 0) {
            battle.active = false;
            battleStatus.textContent = "You lost. Start another battle to try again.";
        } else {
            battleStatus.textContent = "Your turn. Attack or use a potion.";
        }
        showBattle();
    }

    // Form event: entering a name starts or restarts the battle.
    battleForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const name = heroNameInput.value.trim();

        if (name === "") {
            battleStatus.textContent = "Please enter a hero name first.";
            return;
        }

        battle.heroName = name;
        battle.heroHP = 18;
        battle.enemyHP = 20;
        battle.potions = 1;
        battle.active = true;
        battleLog.replaceChildren();
        addBattleMessage(name + " faces the Static Wisp!");
        battleStatus.textContent = "Battle started. Choose Attack or Potion.";
        showBattle();
        heroNameInput.blur();
    });

    // Mouse event: click the commands to take a turn.
    attackButton.addEventListener("click", function () {
        takeTurn("attack");
    });
    potionButton.addEventListener("click", function () {
        takeTurn("potion");
    });

    // Keyboard event: A attacks and H uses a potion without clicking.
    document.addEventListener("keydown", function (event) {
        if (event.target === heroNameInput || event.repeat) {
            return;
        }
        if (event.key === "a" || event.key === "A") {
            takeTurn("attack");
        } else if (event.key === "h" || event.key === "H") {
            takeTurn("potion");
        }
    });
}

// Activity 10: look up a Final Fantasy XIV ability using XIVAPI.
const abilityButton = document.getElementById("ability-button");

if (abilityButton) {
    const abilityChoice = document.getElementById("ability-choice");
    const abilityStatus = document.getElementById("ability-status");
    const abilityResult = document.getElementById("ability-result");

    abilityButton.addEventListener("click", async function () {
        const url = "https://v2.xivapi.com/api/sheet/Action/" + abilityChoice.value +
            "?fields=Name,ClassJobLevel,Range&transient=Description";
        abilityButton.disabled = true;
        abilityChoice.disabled = true;
        abilityStatus.textContent = "Looking up the ability...";
        abilityResult.replaceChildren();

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("The API request failed.");
            }

            const action = await response.json();
            if (!action.fields || !action.fields.Name ||
                typeof action.fields.ClassJobLevel !== "number" ||
                typeof action.fields.Range !== "number") {
                throw new Error("Some ability details are missing.");
            }

            const heading = document.createElement("h3");
            heading.textContent = action.fields.Name;
            const details = document.createElement("ul");
            const facts = [
                "Level: " + action.fields.ClassJobLevel,
                "Range: " + action.fields.Range + " yalms"
            ];

            for (const fact of facts) {
                const line = document.createElement("li");
                line.textContent = fact;
                details.appendChild(line);
            }

            const description = document.createElement("p");
            if (action.transient && action.transient.Description) {
                description.textContent = action.transient.Description;
            } else {
                description.textContent = "No description is available for this ability.";
            }

            abilityResult.append(heading, details, description);
            abilityStatus.textContent = "Found " + action.fields.Name + ".";
        } catch (error) {
            abilityStatus.textContent = "FFXIV ability information is unavailable right now. Check your connection and try again.";
        }

        abilityButton.disabled = false;
        abilityChoice.disabled = false;
    });
}
