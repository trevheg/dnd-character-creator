import { loadHeaderFooter } from "./headerFooter.mjs";
import { consoleAPI, convertToJson } from "./utils.mjs"
import { addElement, returnElement, addButton, createMenu, returnButton } from "./elementCreation.mjs"

loadHeaderFooter();

const dndAPI = "https://www.dnd5eapi.co/api/2014/";
const dndShortAPI = "https://www.dnd5eapi.co"

// consoleAPI(dndAPI + "classes");

const character = JSON.parse(localStorage.getItem("character"));
document.querySelector("#character-name").textContent = character.name;

// consoleAPI(dndAPI + "classes")

async function displayClassInfo(info) {

    const infoElement = document.querySelector("#information");
    // fetch api
    const response = await fetch(dndShortAPI + info.url);
    const data = await convertToJson(response);    
    console.log(data)

    infoElement.innerHTML = '';

    // console.log(dndShortAPI + data.subclasses[0].url)

    // Display the Chosen Class and Information about that class
    const subclassResponse = await fetch(dndShortAPI + data.subclasses[0].url);
    const subclassData = await convertToJson(subclassResponse);  
    // console.log(subclassData)        
    addElement(infoElement, "h2", `${subclassData.name} ${data.name}` , "infoElement");
    addElement(infoElement, "h3", subclassData.desc)

    // consoleAPI(dndShortAPI + data.class_levels)
    // consoleAPI(dndShortAPI + subclassData.subclass_levels[0])

    // display class features at level 1
    addElement(infoElement, "h2", data.name + " Level 1 features:")


    const levelOneResponse = await fetch(dndShortAPI + data.class_levels);
    const levelOneData = await convertToJson(levelOneResponse);  
    // console.log(levelOneData[0].features)

    const features = levelOneData[0].features;
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
        infoElement.appendChild(button);
    })

    const submitButton = addButton(infoElement, `Make ${character.name} a(n) ${data.name}?`, "submit-button", () => {
        character.class = data.index;
        localStorage.setItem('character', JSON.stringify(character));
        window.location.href = "class.html";
    } );
}

createMenu(dndAPI + "classes", document.querySelector("#menu"), displayClassInfo)