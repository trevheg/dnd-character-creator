import { convertToJson } from "./utils.mjs";

// Creaate a menu of everything in the submitted category
export async function createMenu(api, parentElement, event) {
    const list = await createList(api);
    // create a button for each item in the menu
    const menuDiv = document.createElement("div");
    menuDiv.classList.add("menu");
    for (let key in list) {    
      addButton(menuDiv, list[key].name, "menu-button", () => event(list[key]))
    }
    parentElement.appendChild(menuDiv);
}

// create a list of elements in a category given an api
export async function createList(api) {
    const response = await fetch(api);
    const data = await convertToJson(response);
    const list = data.results;
    return list;
}

// adds an element to a parent element
export function addElement(parentElement, type, content, elementClass) {
  const element = returnElement(type, content, elementClass);
  parentElement.appendChild(element);
}

// returns an element so it can be manipulated
export function returnElement(type, content, elementClass) {
  const element = document.createElement(type);
  if (content) {
    element.innerHTML = content;
  }
  if (elementClass) {
    element.classList.add(elementClass);
  }
  return element;
}

// creates a button and adds it to the parent element. 
export function addButton(parentElement, content, buttonClass, event) {
  const newButton = returnElement("button", content, buttonClass);
  newButton.addEventListener("click", event);
  parentElement.appendChild(newButton);
}

export function returnButton(content, buttonClass, event) {
  const newButton = returnElement("button", content, buttonClass);
  newButton.addEventListener("click", event);
  returnButton;
}

