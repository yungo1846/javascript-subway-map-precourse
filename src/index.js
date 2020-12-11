import Station from "./manager/station.js";

export default function SubwayMap() {
  const station = new Station();
  let stationBtn = document.getElementById("station-manager-button");
  const LINE_MANAGER_BUTTON_ID = "line-manager-button";
  const SECTION_MANAGER_BUTTON_ID = "section-manager-button";
  const MAP_PRINT_MANAGER_BUTTON_ID = "map-print-manager-button";

  this.onClickStation = () => {
    console.log("clicked");
    station.render();
    const stationInputBtn = document.getElementById("station-add-button");
    stationInputBtn.addEventListener("click", station.addStation);
  };

  stationBtn.addEventListener("click", this.onClickStation);
}

new SubwayMap();
