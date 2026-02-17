import { loadHeaderFooter } from "./headerFooter.mjs";
import Character from "./character.mjs";
import { returnName } from "./name.mjs"
import { addButton } from "./elementCreation.mjs"

loadHeaderFooter();

const characterForm = document.querySelector("#characterForm");
characterForm.addEventListener("submit", () => {
    event.preventDefault();
    const characterName = document.querySelector("#characterName").value;
    const character = new Character(characterName);
    localStorage.setItem('character', JSON.stringify(character));
    window.location.href = "race.html";
})

const generateButton = document.querySelector("#generate-button");
const generatedName = document.querySelector("#generated-name");
generateButton.addEventListener("click", () => {
    generatedName.textContent = returnName() + " " + returnName();
    const nameGenerator = document.querySelector("#name-generator");
    if (!document.querySelector(".use-name-button")) {
        addButton(nameGenerator, "Use generated name", "use-name-button", () => {
            const character = new Character (generatedName.textContent);
            localStorage.setItem('character', JSON.stringify(character));
            window.location.href = "race.html";
        })
    }
    
})

