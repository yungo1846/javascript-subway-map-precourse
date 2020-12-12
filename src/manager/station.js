import { isSatisfyLength, isStationAlreadyExist, isStationOnLine } from "../inputCheck.js";
import { alertMessage } from "../alertMessage.js";

export default function Station() {
  const resultContainer = document.getElementById("result-container");
  let lines;
  this.stations = [
    "인천",
    "동인천",
    "도원",
    "소요산",
    "사당",
    "시청",
    "신도림",
    "대화",
    "오금",
    "오이도",
    "당고개",
  ];
  this.count = this.stations.length;

  this.addStation = () => {
    const stationInput = document.getElementById("station-name-input").value;
    const stationTable = document.getElementById("station-table");
    if (!isSatisfyLength(stationInput)) {
      alert(alertMessage.SHORT_LENGTH_ERROR);
      return;
    } else if (isStationAlreadyExist(this.stations, stationInput)) {
      alert(alertMessage.SAME_STATION_EXIST_ERROR);
      return;
    }
    const addHTML = `
      <tr id="station${this.count}">
        <td><span>${stationInput}</span></td>
        <td><button class="station-delete-button" id="${this.count}">삭제</button></td>
      </tr>`;
    this.stations.push(stationInput);
    stationTable.insertAdjacentHTML("beforeend", addHTML);
    const newStation = document.getElementById(`${this.count}`);
    newStation.addEventListener("click", (event) => this.deleteStation(event));
    this.count++;
  };

  this.deleteStation = (event) => {
    const targetId = event.target.id;
    const targetValue = event.target.value;
    const delStation = document.getElementById(`station${targetId}`);
    if (isStationOnLine(lines, targetValue)) {
      alert(alertMessage.DELETE_STATION_ON_LINE_MESSAGE);
      return;
    }
    delStation.remove();
    this.stations.splice(this.stations.indexOf(targetValue), 1);
  };

  this.printStationList = () => {
    let listHTML = `<table border="1" id="station-table"><th>역 이름</th><th>설정</th>`;
    for (let i = 0; i < this.stations.length; i++) {
      listHTML += `
      <tr id="station${i}">
        <td><span>${this.stations[i]} </span></td>
        <td><button class="station-delete-button" id="${i}" value="${this.stations[i]}">삭제</button></td>
      </tr>`;
    }
    listHTML += `</table>`;
    return listHTML;
  };

  this.printInput = () => {
    const stationListHtml = `
      <h4>역 이름</h4>
      <input type="text" id="station-name-input" placeholder="역 이름을 입력해주세요."></input>
      <button id="station-add-button">역 추가</button>
      <h2>🚉 지하철 역 목록</h2>
      `;

    return stationListHtml;
  };

  this.render = (lineList) => {
    lines = lineList;
    resultContainer.insertAdjacentHTML("beforeend", this.printInput() + this.printStationList());
  };
}
