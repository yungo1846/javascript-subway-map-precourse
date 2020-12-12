import { constant } from "./constant.js";
export function isSatisfyLength(len) {
  if (String(len).length < constant.minLength) {
    return false;
  }
  return true;
}

export function isSameDestination(start, end) {
  if (start !== end) {
    return false;
  }
  return true;
}
