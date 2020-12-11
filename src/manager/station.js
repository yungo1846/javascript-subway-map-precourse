import Element from "../element.js";

export default function Station() {
  const element = new Element();
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

  this.addStation = () => {
    const stationInput = document.getElementById("station-name-input").value;
    const addHTML = `
      <span>${stationInput} </span>
      <button class="station-delete-button">삭제</button><br>`;
    stations.push(stationInput);
    resultContainer.insertAdjacentHTML("beforeend", addHTML);
  };

  this.printStationList = () => {
    let listHTML = "";
    for (let i = 0; i < stations.length; i++) {
      listHTML += `<span>${stations[i]} </span>`;
      listHTML += `<button class="station-delete-button">삭제</button><br>`;
    }

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
