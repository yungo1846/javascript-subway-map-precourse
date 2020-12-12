import { constant } from "./constant.js";
export function lengthCheck(len) {
  if (String(len).length < constant.minLength) {
    return false;
  }
  return true;
}
