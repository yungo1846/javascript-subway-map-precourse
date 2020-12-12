import { isSameDestination, isLineAlreadyExist } from "../inputCheck.js";
import { alertMessage } from "../alertMessage.js";

export default function Line() {
  const resultContainer = document.getElementById("result-container");
  let stations;
  this.lines = [
    { name: "1호선", sections: ["인천", "소요산"] },
    { name: "2호선", sections: ["시청", "신도림"] },
    { name: "3호선", sections: ["대화", "오금"] },
  ];
  let count = this.lines.length;

  this.addLine = () => {
    const lineNameInput = document.getElementById("line-name-input").value;
    const lineStart = document.getElementById("line-start-station-selector").value;
    const lineEnd = document.getElementById("line-end-station-selector").value;
    const lineTable = document.getElementById("line-table");
    if (isSameDestination(lineStart, lineEnd)) {
      alert(alertMessage.SAME_DESTINATION_ERROR);
      return;
    } else if (isLineAlreadyExist(this.lines, lineNameInput)) {
      alert(alertMessage.SAME_LINE_EXIST_ERROR);
      return;
    }
    const addHTML = `
          <tr id="line${count}">
            <td><span>${lineNameInput}</span></td>
            <td><span>${lineStart}</span></td>
            <td><span>${lineEnd}</span></td>
            <td><button class="line-delete-button" id="${count}" value=${lineNameInput}>삭제</button></td>
          </tr>`;
    this.lines.push({
      name: lineNameInput,
      sections: [lineStart, lineEnd],
    });
    lineTable.insertAdjacentHTML("beforeend", addHTML);
    const newLine = document.getElementById(`${count}`);
    newLine.addEventListener("click", (event) => this.deleteLine(event));
    count++;
  };

  this.deleteLine = (event) => {
    const targetId = event.target.id;
    const targetValue = event.target.value;
    const delLine = document.getElementById(`line${targetId}`);
    if (!confirm(alertMessage.DELETE_CHECK_MESSAGE)) {
      return;
    }
    delLine.remove();
    for (let i = 0; i < this.lines.length; i++) {
      if (this.lines[i].name === targetValue) {
        this.lines.splice(i, 1);
      }
    }
    console.log(this.lines);
  };

  this.printLineList = () => {
    let listHTML = `<table border="1" id="line-table"><th>노선 이름</th><th>상행 종점역</th><th>하행 종점역</th><th>설정</th>`;
    for (let i = 0; i < this.lines.length; i++) {
      listHTML += `
          <tr id="line${i}">
            <td><span>${this.lines[i].name}</span></td>
            <td><span>${this.lines[i].sections[0]}</span></td>
            <td><span>${this.lines[i].sections[this.lines[i].sections.length - 1]}</span></td>
            <td><button class="line-delete-button" id="${i}" value=${
        this.lines[i].name
      }>삭제</button></td>
          </tr>`;
    }
    listHTML += `</table>`;
    return listHTML;
  };

  this.printInput = () => {
    const lineHtml = `
          <div><h4>노선 이름</h4>
            <input type="text" id="line-name-input" placeholder="노선 이름을 입력해주세요."></input></div><br>
          <div><span>상행 종점</span>
            <select id="line-start-station-selector">
            ${stations.map((station) => `<option value=${station}>${station}</option>`).join("")}
            </select></div><br>
          <div><span>하행 종점</span>
            <select id="line-end-station-selector">
            ${stations.map((station) => `<option value=${station}>${station}</option>`).join("")}
            </select></div><br>
          <button id="line-add-button">노선 추가</button>
          <h2>🚉 지하철 노선 목록</h2>
          `;

    return lineHtml;
  };

  this.render = (stationList) => {
    stations = stationList;
    resultContainer.insertAdjacentHTML("beforeend", this.printInput() + this.printLineList());
  };
}
