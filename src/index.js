import Station from "./manager/station.js";
import Line from "./manager/line.js";

export default function SubwayMap() {
  const station = new Station();
  const line = new Line();
  const stationBtn = document.getElementById("station-manager-button");
  const lineBtn = document.getElementById("line-manager-button");
  const SECTION_MANAGER_BUTTON_ID = "section-manager-button";
  const MAP_PRINT_MANAGER_BUTTON_ID = "map-print-manager-button";
  const resultContainer = document.getElementById("result-container");

  this.onClickStation = () => {
    station.render();
    const stationInputBtn = document.getElementById("station-add-button");
    stationInputBtn.addEventListener("click", station.addStation);
    const stationDelBtns = document.getElementsByClassName("station-delete-button");
    for (let i = 0; i < stationDelBtns.length; i++) {
      stationDelBtns[i].addEventListener("click", (event) => station.deleteStation(event));
    }
  };

  this.onClickLine = () => {
    line.render(station.stations);
    const lineInputBtn = document.getElementById("line-add-button");
    lineInputBtn.addEventListener("click", line.addLine);
    const lineDelBtn = document.getElementsByClassName("line-delete-button");
    for (let i = 0; i < lineDelBtn.length; i++) {
      lineDelBtn[i].addEventListener("click", (event) => line.deleteLine(event));
    }
  };

  stationBtn.addEventListener("click", this.onClickStation);
  lineBtn.addEventListener("click", this.onClickLine);
}

new SubwayMap();
