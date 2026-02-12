export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML = template;
  if(callback) {
    callback(data);
  }
}

// This asynchronous function fetches the content of the HTML file given a path. The response to the fetch is converted to text and returns the HTML content as a string.
export async function loadTemplate(path) {
  const fileContents = await fetch(path);
  const template = await fileContents.text();
  return template;
}

// converts an api to json
export async function convertToJson(res) {
  // Convert Response to JSON first
  const jsonResponse = await res.json();

  if (res.ok) {
    return jsonResponse;
  } else {
    throw { name: 'serviceError', message: jsonResponse };
  }
}

export function addElement(parentElement, type, content, elementClass) {

  const element = document.createElement(type);
  if (content) {
    element.innerHTML = content;
  }
  if (elementClass) {
    element.classList.add(elementClass);
  }
  parentElement.appendChild(element);
}

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

// prints the result of an api to the console. Mainly for development purposes. 
export async function consoleAPI(api) {
      const response = await fetch(api);
      const data = await convertToJson(response);
      console.log(data);
}

