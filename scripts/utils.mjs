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

