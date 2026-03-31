import {
  FeildsArr,
  HeaderSubFeilds,
  type FieldWithSubFields,
} from "../types.js";

export function getSubfeilds(feild: FieldWithSubFields) {
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

export * from "./reply.helper.js";
export * from "./feildType.helper.js";
