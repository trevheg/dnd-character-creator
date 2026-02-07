import { renderWithTemplate, loadTemplate} from "./utils.mjs"

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

}