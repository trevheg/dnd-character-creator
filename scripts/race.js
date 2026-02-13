import { loadHeaderFooter } from "./headerFooter.mjs";
import { convertToJson, addElement, returnElement, consoleAPI, addButton } from "./utils.mjs"

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
    const raceData = await convertToJson(response);
    console.log(raceData);
    const raceInfoElement = document.querySelector("#race-info");
    raceInfoElement.innerHTML = "";
    
    addElement(raceInfoElement, "h2", raceData.name, "infoElement");
    addElement(raceInfoElement, "h3", raceData.alignment, "infoElement");
    addElement(raceInfoElement, "h3", raceData.size_description, "infoElement");
    addElement(raceInfoElement, "h3", raceData.age, "infoElement");
    addElement(raceInfoElement, "h3", raceData.language_desc, "infoElement");

    // Traits
    
    addElement(raceInfoElement, "h3", "Traits:");
    const traits = raceData.traits;
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
            // console.log(traitData)
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
    addElement(raceInfoElement, "h3", "Ability Bonuses:")
    const abilityBonuses = raceData.ability_bonuses;
    // console.log(abilityBonuses)
    abilityBonuses.forEach(bonus => {
        addElement(raceInfoElement, "h4", `    ${bonus.ability_score.name} +${bonus.bonus}`)
        console.log(bonus)
        })


}


// Creaate a menu of everything in the submitted category
async function createMenu(api, category, element) {

    const list = await createList(api, category);

    // create a button for each item in the menu
    for (let key in list) {
        const menuElement = document.querySelector(element)

        const newButton = addButton(menuElement, list[key].name, "menu-button", () => displayRaceInfo(list[key]))

    }

}

consoleAPI(dndAPI + "races/elf")
createMenu(dndAPI, "races", "#race-menu")








