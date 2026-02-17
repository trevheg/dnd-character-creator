import { loadHeaderFooter } from "./headerFooter.mjs";
import { consoleAPI, convertToJson } from "./utils.mjs"
import { addElement, returnElement, addButton, createMenu, returnButton } from "./elementCreation.mjs"
import Character from "./character.mjs";

loadHeaderFooter();

const character = JSON.parse(localStorage.getItem("character")) || new Character("unchosen");

const characterNames = document.querySelectorAll(".character-name");
characterNames.forEach(characterName => characterName.textContent = character.name);

document.querySelector("#character-race").textContent = character.race;
document.querySelector("#character-class").textContent = character.class;

