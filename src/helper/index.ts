import {
  FeildsArr,
  HeaderSubFeilds,
  type FieldsWithSubfeilds,
} from "../types.js";

export function getSubfeilds(feild: FieldsWithSubfeilds) {
  switch (feild) {
    case "Header":
      return ["Name", "Phone", "Email"];
    case "Links":
      return ["Github", "Linkedin", "X"];
    case "Skills":
      return ["Technical", "Soft", "Tools"];
  }
}

export function getFeilds() {
  return FeildsArr;
}
