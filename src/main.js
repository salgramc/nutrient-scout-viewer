import "./style.css";

let viewerInstance = null;

document.querySelector("#app").innerHTML = `
<h1>⚽ Soccer Scout Report Viewer</h1>

<input
  type="file"
  id="pdfFile"
  accept=".pdf"
/>

<div id="viewer"></div>
`;

document
  .getElementById("pdfFile")
  .addEventListener("change", loadPdf);

async function loadPdf(event) {

  try {

    const file =
      event.target.files[0];

    if (!file) return;

    const arrayBuffer =
      await file.arrayBuffer();

    const container =
      document.getElementById("viewer");

    if (viewerInstance) {
      window.NutrientViewer.unload(container);
    }

    viewerInstance =
      await window.NutrientViewer.load({
        container,
        document: arrayBuffer
      });

    console.log(
      "PDF Loaded:",
      file.name
    );

  } catch (error) {

    console.error(
      "Failed to load PDF",
      error
    );

    alert(
      "Unable to load PDF."
    );
  }
}