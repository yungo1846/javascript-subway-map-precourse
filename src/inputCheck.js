import { constant } from "./constant.js";
export function isSatisfyLength(len) {
  let result = true;
  if (String(len).length < constant.minLength) {
    result = false;
  }

  return result;
}

export function isSameDestination(start, end) {
  let result = true;
  if (start !== end) {
    result = false;
  }

  return result;
}

export function isStationAlreadyExist(list, name) {
  let result = false;
  for (let i = 0; i < list.length; i++) {
    if (name === list[i]) {
      return true;
    }
  }

  return result;
}

export function isLineAlreadyExist(list, name) {
  let result = false;
  for (let i = 0; i < list.length; i++) {
    if (name === list[i].name) {
      return true;
    }
  }

  return result;
}
