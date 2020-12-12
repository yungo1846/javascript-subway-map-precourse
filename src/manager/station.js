import { lengthCheck } from "../inputCheck.js";
import { alertMessage } from "../alertMessage.js";

export default function Station() {
  const resultContainer = document.getElementById("result-container");
  let stations = [
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
  let count = stations.length;

  this.addStation = () => {
    const stationInput = document.getElementById("station-name-input").value;
    const stationTable = document.getElementById("station-table");
    if (!lengthCheck(stationInput)) {
      alert(`${alertMessage.SHORT_LENGTH_ERROR}`);
      return;
    }
    const addHTML = `
      <tr id="station${count}">
        <td><span>${stationInput} </span></td>
        <td><button class="station-delete-button" id="${count}">삭제</button></td>
      </tr>`;
    stations.push(stationInput);
    stationTable.insertAdjacentHTML("beforeend", addHTML);
    const newStation = document.getElementById(`${count}`);
    newStation.addEventListener("click", (event) => this.deleteStation(event));
    count++;
  };

  this.deleteStation = (event) => {
    const targetId = event.target.id;
    const delStation = document.getElementById(`station${targetId}`);
    delStation.remove();
  };

  this.printStationList = () => {
    let listHTML = `<table border="1" id="station-table"><th>역 이름</th><th>설정</th>`;
    for (let i = 0; i < stations.length; i++) {
      listHTML += `
      <tr id="station${i}">
        <td><span>${stations[i]} </span></td>
        <td><button class="station-delete-button" id="${i}">삭제</button></td>
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

  this.render = () => {
    resultContainer.insertAdjacentHTML("beforeend", this.printInput() + this.printStationList());
  };
}
