import { loadHeaderFooter } from "./headerFooter.mjs";
import { convertToJson, addElement, returnElement, consoleAPI } from "./utils.mjs"

loadHeaderFooter();

const dndAPI = "https://www.dnd5eapi.co/api/2014/";
const dndShortAPI = "https://www.dnd5eapi.co"

// create a list of elements in a category given an api
async function createList(api, category) {
    const response = await fetch(api + category);
    const data = await convertToJson(response);
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
    addElement(raceInfoElement, "h3", "Traits:");
    const traits = data.traits;
    // make a button for each trait that opens a dialog with info about that trait      

    traits.forEach(trait => {        
        const traitButton = returnElement("button", trait.name, "trait-button");
        // make traitButton open a dialog with trait info
        const traitDialog = returnElement("dialog", "", "trait-dialog")
        
        // Append dialog to DOM before attaching listener
        raceInfoElement.appendChild(traitDialog);
        
        traitButton.addEventListener("click", async () => {
            traitDialog.innerHTML = "";
            traitDialog.classList.add('show');
            const traitResponse = await fetch(dndShortAPI + trait.url);
            const traitData = await convertToJson(traitResponse);
            console.log(traitData)
            addElement(traitDialog, "p", traitData.desc, "trait-description")
            const closeButton = returnElement("button", "Close", "close-button");
            closeButton.addEventListener('click', () => {
                traitDialog.classList.remove('show');
                traitDialog.close()
            });
            traitDialog.appendChild(closeButton);

            traitDialog.showModal();
        });

        raceInfoElement.appendChild(traitButton);
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








