import { loadHeaderFooter } from "./headerFooter.mjs";
import {convertToJson} from "./utils.mjs"

loadHeaderFooter();

const dndAPI = "https://www.dnd5eapi.co/api/2014/";
const dndShortAPI = "https://www.dnd5eapi.com"


// Creaate a menu of everything in the submitted category
async function createMenu(api, category) {
    const response = await fetch(api + category);
    const data = await convertToJson(response);
    // console.log(data.results)
    const list = data.results;
    const menuElement = document.querySelector("#race-menu")
    // create a button for each item in the menu
    for (let key in list) {

        const newButton = document.createElement('button');
        newButton.innerText = list[key].name;
        newButton.classList.add("menu-button")
        // console.log(list[key].url)
        newButton.dataset.apiURL = list[key].url;
        // add an event listener to the button that runs createMenu for it? 

        menuElement.appendChild(newButton);
    }

}

createMenu(dndAPI, "classes")






