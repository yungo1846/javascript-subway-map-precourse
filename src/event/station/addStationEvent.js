import renderStation from "../../render/renderStation.js";
import { isSatisfyLength, isStationAlreadyExist } from "../../common/checkInput.js";
import { alertMessage } from "../../common/alertMessage.js";
import { clearInput } from "../../common/clearInput.js";

function addStation(stationInput) {
  let stations = JSON.parse(localStorage.stations);
  stations.push(String(stationInput));
  localStorage.stations = JSON.stringify(stations);
  renderStation();
  clearInput();
}

function checkValidStation() {
  const station = document.getElementById("station-name-input").value;
  let stations = JSON.parse(localStorage.stations);

  if (!isSatisfyLength(station)) {
    return alert(alertMessage.SHORT_LENGTH_ERROR);
  } else if (isStationAlreadyExist(stations, station)) {
    return alert(alertMessage.SAME_STATION_EXIST_ERROR);
  }
  addStation(station);
}

export default function addStationEvent() {
  const $addStationBtn = document.getElementById("station-add-button");
  $addStationBtn.addEventListener("click", checkValidStation);
}
