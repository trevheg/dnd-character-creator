import { renderWithTemplate, loadTemplate } from "./utils.mjs"


const currentYear = document.querySelector("#currentYear");
const lastModified = document.querySelector("#lastModified");
const myDateOptions = {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric"
};

// Loads the default header and footer on each page. 
export async function loadHeaderFooter() {
// Load the header and footer templates in from the partials using loadTemplate.
  const headerTemplate = await loadTemplate("./partials/header.html");
  const footerTemplate = await loadTemplate("./partials/footer.html");

// Grab the header and footer placeholder elements out of the DOM.
  const headerElement = document.querySelector("header");
  const footerElement = document.querySelector("footer");

// Render the header and footer using renderWithTemplate.
  renderWithTemplate(headerTemplate, headerElement);
  renderWithTemplate(footerTemplate, footerElement);

  loadDates();


}

function loadDates() {
  const currentYear = document.querySelectorAll(".currentYear");
  const lastModified = document.querySelector("#lastModified");
  const myDateOptions = {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric"
  };

  // get a date object
  const today = new Date();

  // put the current year in the web page
  currentYear.forEach( element => element.innerHTML = today.getFullYear());

  // put the last modified date in the page
  lastModified.innerHTML = (Date(document.lastModified));

}