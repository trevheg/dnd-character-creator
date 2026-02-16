import { loadHeaderFooter } from "./headerFooter.mjs";
import { consoleAPI, convertToJson } from "./utils.mjs"
import { addElement, returnElement, addButton, createMenu, returnButton } from "./elementCreation.mjs"

loadHeaderFooter();

const character = JSON.parse(localStorage.getItem("character"));

const characterNames = document.querySelectorAll(".character-name");
characterNames.forEach(characterName => characterName.textContent = character.name);

document.querySelector("#character-race").textContent = character.race;
document.querySelector("#character-class").textContent = character.class;

