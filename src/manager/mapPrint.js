export default function MapPrint() {
  const resultContainer = document.getElementById("result-container");
  this.render = (lineList) => {
    let newHTML = `
        ${lineList
          .map(
            (line) =>
              `<h3>${line.name}</h3><ul>` +
              line.sections.map((section) => `<li>${section}</li>`).join("") +
              `</ul>`
          )
          .join("")}
        `;
    resultContainer.insertAdjacentHTML("beforeend", newHTML);
  };
}
