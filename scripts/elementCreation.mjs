import { convertToJson } from "./utils.mjs";

// Creaate a menu of everything in the submitted category
export async function createMenu(api, category, element, event) {
    const list = await createList(api, category);
    // create a button for each item in the menu
    for (let key in list) {
      const menuElement = document.querySelector(element)
      addButton(menuElement, list[key].name, "menu-button", () => event(list[key]))
    }
}

// create a list of elements in a category given an api
export async function createList(api, category) {
    const response = await fetch(api + category);
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