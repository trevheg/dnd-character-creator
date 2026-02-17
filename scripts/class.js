import { loadHeaderFooter } from "./headerFooter.mjs";
import { consoleAPI, convertToJson } from "./utils.mjs"
import { addElement, returnElement, addButton, createMenu, returnButton } from "./elementCreation.mjs"
import Character from "./character.mjs";

loadHeaderFooter();

const dndAPI = "https://www.dnd5eapi.co/api/2014/";
const dndShortAPI = "https://www.dnd5eapi.co"

// consoleAPI(dndAPI + "classes");

const character = JSON.parse(localStorage.getItem("character")) || new Character();
document.querySelector("#character-name").textContent = character.name;

// consoleAPI(dndAPI + "classes")

async function displayClassInfo(info) {

    const informationElement = document.querySelector("#information");
    // fetch api
    const response = await fetch(dndShortAPI + info.url);
    const data = await convertToJson(response);    
    console.log(data)

    informationElement.innerHTML = '';

    // creating a div to put inside the other div so that it can be erased and expand when created 
    const infoElement = document.createElement("div");
    infoElement.classList.add("infoElement");


    // Display the Chosen Class and Information about that class
    const subclassResponse = await fetch(dndShortAPI + data.subclasses[0].url);
    const subclassData = await convertToJson(subclassResponse);  
     
    addElement(infoElement, "h2", `${subclassData.name} ${data.name}` , "");
    addElement(infoElement, "h3", subclassData.desc, "factElement")



    // display class features at level 1
    addElement(infoElement, "h2", " Level 1 features:")


    const levelOneResponse = await fetch(dndShortAPI + data.class_levels);
    const levelOneData = await convertToJson(levelOneResponse);  




    const features = levelOneData[0].features;
    const featuresButtons = document.createElement("div");
    features.forEach(feature => {
        const button = returnElement('button', feature.name, 'feature-button');
        const dialog = returnElement('dialog', '', 'feature-dialog');

        infoElement.appendChild(dialog);
        button.addEventListener("click", async () => {
                    // clear dialog
                    dialog.innerHTML = "";
                    const dialogResponse = await fetch(dndShortAPI + feature.url);
                    const dialogData = await convertToJson(dialogResponse);
                    // console.log(dialogData)
                    addElement(dialog, "p", dialogData.desc, "trait-description")
                    const closeButton = returnElement("button", "Close", "close-button");
                    closeButton.addEventListener('click', () => dialog.close());
                    dialog.appendChild(closeButton);
        
                    dialog.showModal();
        });
        featuresButtons.appendChild(button);
    })
    infoElement.appendChild(featuresButtons)

    const submitButton = addButton(infoElement, `Make ${character.name} a(n) ${data.name}`, "submit-button", () => {
        character.class = data.name;
        localStorage.setItem('character', JSON.stringify(character));
        window.location.href = "character-sheet.html";
    } );

    // make info element grow instead of suddenly appear
    informationElement.appendChild(infoElement);
    infoElement.offsetHeight;  // Force reflow
    infoElement.classList.add('expanded');

}

createMenu(dndAPI + "classes", document.querySelector("#menu"), displayClassInfo)