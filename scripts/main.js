import { loadHeaderFooter } from "./headerFooter.mjs";
import Character from "./character.mjs";


const characterForm = document.querySelector("#characterForm");
characterForm.addEventListener("submit", () => {
    event.preventDefault();
    const characterName = document.querySelector("#characterName").value;
    const character = new Character(characterName);
    localStorage.setItem('character', JSON.stringify(character));
    window.location.href = "race.html";
})



loadHeaderFooter();