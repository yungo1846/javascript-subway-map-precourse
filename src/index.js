import Station from "./manager/station.js";
import Line from "./manager/line.js";
import Section from "./manager/section.js";
import MapPrint from "./manager/mapPrint.js";

export default function SubwayMap() {
  const station = new Station();
  const line = new Line();
  const section = new Section();
  const mapPrint = new MapPrint();
  const stationBtn = document.getElementById("station-manager-button");
  const lineBtn = document.getElementById("line-manager-button");
  const sectionBtn = document.getElementById("section-manager-button");
  const mapPrintBtn = document.getElementById("map-print-manager-button");
  const resultContainer = document.getElementById("result-container");

  this.onClickStation = () => {
    resultContainer.innerHTML = "";
    station.render(line.lines);
    const stationInputBtn = document.getElementById("station-add-button");
    stationInputBtn.addEventListener("click", station.addStation);
    const stationDelBtns = document.getElementsByClassName("station-delete-button");
    for (let i = 0; i < stationDelBtns.length; i++) {
      stationDelBtns[i].addEventListener("click", (event) => station.deleteStation(event));
    }
  };

  this.onClickLine = () => {
    resultContainer.innerHTML = "";
    line.render(station.stations);
    const lineInputBtn = document.getElementById("line-add-button");
    lineInputBtn.addEventListener("click", line.addLine);
    const lineDelBtns = document.getElementsByClassName("line-delete-button");
    for (let i = 0; i < lineDelBtns.length; i++) {
      lineDelBtns[i].addEventListener("click", (event) => line.deleteLine(event));
    }
  };

  this.onClickSection = () => {
    resultContainer.innerHTML = ``;
    section.render(station, line);
    const sectionSelectBtn = document.getElementsByClassName("section-line-menu-button");
    for (let i = 0; i < sectionSelectBtn.length; i++) {
      sectionSelectBtn[i].addEventListener("click", (event) => section.setSection(event));
    }
  };

  this.onClickMapPrint = () => {
    resultContainer.innerHTML = "";
    mapPrint.render(line.lines);
  };

  stationBtn.addEventListener("click", this.onClickStation);
  lineBtn.addEventListener("click", this.onClickLine);
  sectionBtn.addEventListener("click", this.onClickSection);
  mapPrintBtn.addEventListener("click", this.onClickMapPrint);
}

new SubwayMap();
