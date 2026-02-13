
import { loadHeaderFooter } from "./headerFooter.mjs";
import { convertToJson, consoleAPI } from "./utils.mjs"
import { addElement, returnElement, addButton, createMenu } from "./elementCreation.mjs"

loadHeaderFooter();

const dndAPI = "https://www.dnd5eapi.co/api/2014/";
const dndShortAPI = "https://www.dnd5eapi.co"



async function displayRaceInfo(info) {
    // console.log(info);
    // console.log(dndShortAPI + info.url)
    const response = await fetch(dndShortAPI + info.url);
    const raceData = await convertToJson(response);
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
            // clear dialog
            traitDialog.innerHTML = "";
            const traitResponse = await fetch(dndShortAPI + trait.url);
            const traitData = await convertToJson(traitResponse);
            addElement(traitDialog, "p", traitData.desc, "trait-description")
            const closeButton = returnElement("button", "Close", "close-button");
            closeButton.addEventListener('click', () => {
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
    abilityBonuses.forEach(bonus => {
        addElement(raceInfoElement, "h4", `    ${bonus.ability_score.name} +${bonus.bonus}`)
        });
    
    const abilityButtons = document.createElement("div");
    abilityBonuses.forEach(async (bonus) => {
        console.log(bonus.ability_score.url)
        consoleAPI(dndShortAPI + bonus.ability_score.url)
        const abilResponse = await fetch(dndShortAPI + bonus.ability_score.url);
        const abilData = await convertToJson(abilResponse);
        addButton(abilityButtons, abilData.full_name, "ability-button", () => {
            const abilDesc = abilData.desc;
            abilDesc.forEach(desc => console.log(desc))
            // returnElement("dialog", )
        })
    })


}




createMenu(dndAPI, "races", "#race-menu", displayRaceInfo)
consoleAPI(dndAPI + "ability-scores/dex")








