
import { loadHeaderFooter } from "./headerFooter.mjs";
import { consoleAPI, convertToJson } from "./utils.mjs"
import { addElement, returnElement, addButton, createMenu, returnButton } from "./elementCreation.mjs"

loadHeaderFooter();

const dndAPI = "https://www.dnd5eapi.co/api/2014/";
const dndShortAPI = "https://www.dnd5eapi.co"

const character = JSON.parse(localStorage.getItem("character"));
document.querySelector("#character-name").textContent = character.name;

async function displayRaceInfo(info) {
    const informationElement = document.querySelector("#information");  
    // deletes the info element div
    informationElement.innerHTML = ""; 
    // const infoElement = returnElement("div", '', "infoElement");

    const infoElement = document.createElement("div");
    infoElement.classList.add("infoElement");
    

    // fetch api
    const response = await fetch(dndShortAPI + info.url);
    const raceData = await convertToJson(response);
    

    
    addElement(infoElement, "h2", raceData.name, "");
    addElement(infoElement, "h3", raceData.alignment, "factElement");
    addElement(infoElement, "h3", raceData.size_description, "factElement");
    addElement(infoElement, "h3", raceData.age, "factElement");
    addElement(infoElement, "h3", raceData.language_desc, "factElement");


    // Traits
    
    addElement(infoElement, "h2", "Traits:");
    const traits = raceData.traits;
    // make a button for each trait that opens a dialog with info about that trait      


    traits.forEach(trait => {        
        const traitButton = returnElement("button", trait.name, "trait-button");
        // make traitButton open a dialog with trait info
        const traitDialog = returnElement("dialog", "", "trait-dialog")
        
        // Append dialog to DOM before attaching listener
        infoElement.appendChild(traitDialog);
        
        traitButton.addEventListener("click", async () => {
            // clear dialog
            traitDialog.innerHTML = "";
            const traitResponse = await fetch(dndShortAPI + trait.url);
            const traitData = await convertToJson(traitResponse);
            addElement(traitDialog, "p", traitData.desc, "trait-description")
            const closeButton = returnElement("button", "Close", "close-button");
            closeButton.addEventListener('click', () => traitDialog.close());
            traitDialog.appendChild(closeButton);

            traitDialog.showModal();
        });

        infoElement.appendChild(traitButton);
    });

    // Ability Bonuses

    addElement(infoElement, "h2", "Ability Bonuses:")
    const abilityBonuses = raceData.ability_bonuses;
    
    const abilityButtons = document.createElement("div");

    abilityBonuses.forEach(async (bonus) => {
        const abilityButton = returnElement("button", `${bonus.ability_score.name} +${bonus.bonus}` , "ability-button");
        const abilityDialog = returnElement("dialog", "", "ability-dialog");

        infoElement.appendChild(abilityDialog);

        abilityButton.addEventListener("click", async () => {
            abilityDialog.innerHTML = "";
            const abilityResponse = await fetch(dndShortAPI + bonus.ability_score.url);
            const abilityData = await convertToJson(abilityResponse);
            addElement(abilityDialog, "p", abilityData.desc.join( " "), "ability-description");
            const closeButton = returnElement("button", "Close", "close-button");
            closeButton.addEventListener('click', () => abilityDialog.close());
            abilityDialog.appendChild(closeButton);
            abilityDialog.showModal();

        })

        abilityButtons.appendChild(abilityButton)

    })
    infoElement.appendChild(abilityButtons);

    // submit
    const submitButton = addButton(infoElement, `Make ${character.name} a(n) ${raceData.name}`, "submit-button", () => {
        character.race = raceData.name;
        localStorage.setItem('character', JSON.stringify(character));
        window.location.href = "class.html";
    } );
        


    
    informationElement.appendChild(infoElement);
    infoElement.offsetHeight;
    infoElement.classList.add("expanded");
}



createMenu(dndAPI + "races", document.querySelector("#menu"), displayRaceInfo)








