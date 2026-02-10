import { renderWithTemplate, loadTemplate } from "./utils.mjs"

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
  highlightCurrentTab();


}

// creates date objects for the footer
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

// assigns a class to the nav tab of the current page
function highlightCurrentTab() {

  // gets the last part of the current page url
  const currentURL = window.location.href;
  const currentURLEnd = currentURL.split('/').at(-1);


  // compares the url of each link with the page url and attaches a class to the one that matches  
  const linkList = document.querySelectorAll("#nav-list li");
  linkList.forEach(link => {
    // console.log(link.querySelector("a").href)
    const linkEnd = link.querySelector("a").href.split('/').at(-1);
    // console.log(linkEnd);
    if (currentURLEnd === linkEnd) {
      link.classList.add("current-page-tab")
    }
  })
}