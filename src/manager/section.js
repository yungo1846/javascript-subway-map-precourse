import { isSatisfyMinNumOfStations, isSectionAlreadyExist } from "../inputCheck.js";
import { alertMessage } from "../alertMessage.js";

export default function Section() {
  const resultContainer = document.getElementById("result-container");
  let station;
  let line;

  this.deleteSection = (event) => {
    const targetValue = event.target.value;
    const targetName = event.target.name;
    const sectionTable = document.getElementById("section-table");
    let indexOfLine;
    if (!confirm(alertMessage.DELETE_CHECK_MESSAGE)) {
      return;
    }
    for (let i = 0; i < line.lines.length; i++) {
      if (targetName === line.lines[i].name) {
        indexOfLine = i;
      }
    }
    if (!isSatisfyMinNumOfStations(line.lines[indexOfLine])) {
      alert(alertMessage.DELETE_STATIONS_ON_LINE_SHORTAGE_MESSAGE);
      return;
    }
    sectionTable.remove();
    for (let j = 0; j < line.lines[indexOfLine].sections.length; j++) {
      if (line.lines[indexOfLine].sections[j] === targetValue) {
        line.lines[indexOfLine].sections.splice(j, 1);
      }
    }
    this._printSectionList(targetName);
  };

  this.addSection = (lineName) => {
    const newSection = document.getElementById("section-station-selector").value;
    const newSectionOrder = document.getElementById("section-order-input").value;
    let indexOfLine;
    for (let i = 0; i < line.lines.length; i++) {
      if (lineName === line.lines[i].name) {
        indexOfLine = i;
      }
    }
    if (isSectionAlreadyExist(line.lines[indexOfLine].sections, newSection)) {
      alert(alertMessage.SAME_SECTION_EXIST_ERROR);
      return;
    } else if (newSectionOrder === "") {
      alert(alertMessage.ORDERING_INPUT_NOTHING_ERROR);
      return;
    }
    line.lines[indexOfLine].sections = [
      ...line.lines[indexOfLine].sections.slice(0, newSectionOrder),
      newSection,
      ...line.lines[indexOfLine].sections.slice(newSectionOrder),
    ];
    const sectionTable = document.getElementById("section-table");
    sectionTable.remove();
    this.printSectionList(lineName);
  };

  this.setSection = (event) => {
    try {
      document.getElementById("section-container").remove();
    } catch {
      console.log("section-container doesn't exist.");
    }
    const lineName = event.target.value;
    let newHTML = `
        <div id="section-container"><h3>${lineName} 관리</h3>
        <h4>구간 등록</h4>
        <h4><select id="section-station-selector">
        ${station.stations
          .map((station) => `<option value=${station}>${station}</option>`)
          .join("")}</select>
        <input type="number" id="section-order-input" placeholder="순서"></input>
        <button id="section-add-button">등록</button><h4></div>
        `;
    resultContainer.insertAdjacentHTML("beforeend", newHTML);
    this.printSectionList(lineName);
    const sectionInputBtn = document.getElementById("section-add-button");
    sectionInputBtn.addEventListener("click", (event) => this.addSection(lineName));
  };

  this._printSectionList = (lineName) => {
    const sectionContainer = document.getElementById("section-container");
    let newHTML = `<table border="1" id="section-table"><th>순서</th><th>이름</th><th>설정</th>`;
    let indexOfLine;
    for (let i = 0; i < line.lines.length; i++) {
      if (lineName === line.lines[i].name) {
        indexOfLine = i;
      }
    }
    for (let j = 0; j < line.lines[indexOfLine].sections.length; j++) {
      newHTML += `
          <tr id="section${j}">
            <td><span>${j}</span></td>
            <td><span>${line.lines[indexOfLine].sections[j]}</span></td>
            <td><button class="section-delete-button" id="${j}" name=${line.lines[indexOfLine].name} value=${line.lines[indexOfLine].sections[j]}>노션에서 제거</button></td>
          </tr>`;
    }
    newHTML += `</table>`;
    sectionContainer.insertAdjacentHTML("beforeend", newHTML);
    const delSectionBtns = document.getElementsByClassName("section-delete-button");
    for (let k = 0; k < delSectionBtns.length; k++) {
      delSectionBtns[k].addEventListener("click", (event) => this.deleteSection(event));
    }
  };

  this.printSectionList = (lineName) => {
    this._printSectionList(lineName);
  };

  this.printInput = () => {
    let newHTML = `
        <h3>구간을 수정할 노선을 선택해주세요.</h3>
        ${line.lines
          .map(
            (line) =>
              `<button class="section-line-menu-button" value="${line.name}">${line.name}</button>`
          )
          .join(" ")}
        `;
    return newHTML;
  };

  this.render = (instanceStation, instanceLine) => {
    station = instanceStation;
    line = instanceLine;
    resultContainer.insertAdjacentHTML("beforeend", this.printInput());
  };
}
