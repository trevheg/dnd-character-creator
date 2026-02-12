import { loadHeaderFooter } from "./headerFooter.mjs";
import { convertToJson, addElement } from "./utils.mjs"

loadHeaderFooter();

const dndAPI = "https://www.dnd5eapi.co/api/2014/";
const dndShortAPI = "https://www.dnd5eapi.co"

// create a list of elements in a category given an api
async function createList(api, category) {
    const response = await fetch(api + category);
    const data = await convertToJson(response);
    // console.log(data.results)
    const list = data.results;
    return list;
}

async function displayRaceInfo(info) {
    // console.log(info);
    // console.log(dndShortAPI + info.url)
    const response = await fetch(dndShortAPI + info.url);
    const data = await convertToJson(response);
    console.log(data);
    const raceInfoElement = document.querySelector("#race-info");
    raceInfoElement.innerHTML = "";
    addElement(raceInfoElement, "h3", data.alignment, "infoElement");
    addElement(raceInfoElement, "h3", data.size_description, "infoElement");
    addElement(raceInfoElement, "h3", data.age, "infoElement");
    addElement(raceInfoElement, "h3", data.language_desc, "infoElement");

    // Traits
    const traits = data.traits;

    addElement(raceInfoElement, "div", 
        `<h3>${data.name} Traits:</h3>
            <ul>${
                traits.map(e => {
                    return `<li> ${e.name}</li>`
                })
            }<ul>`, 
        "infoElement");
    console.log(data.traits)
    console.log(typeof traits)

    traits.forEach(element => {
        console.log(element.name)
    });

    

    // Ability Bonuses




}


// Creaate a menu of everything in the submitted category
async function createMenu(api, category, element) {

    const list = await createList(api, category);


    // create a button for each item in the menu
    for (let key in list) {
        const menuElement = document.querySelector(element)
        // try replacing code with addElement
        // addElement(menuElement, "button", );

        const newButton = document.createElement('button');
        newButton.innerText = list[key].name;
        newButton.classList.add("menu-button")
        // console.log(list[key].url)
        // newButton.dataset.apiURL = list[key].url;
        newButton.addEventListener("click", () => displayRaceInfo(list[key]));
        
        menuElement.appendChild(newButton);
    }

}


createMenu(dndAPI, "races", "#race-menu")








