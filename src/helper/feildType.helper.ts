import {
  FieldWithSubFieldsArr,
  LeafField,
  LeafFieldArr,
  MultiStringLeafFieldArr,
  type FieldWithSubFields,
} from "../types.js";

export function isFieldWithSubfields(
  field: string,
): field is FieldWithSubFields {
  return FieldWithSubFieldsArr.includes(field as any);
}

export function isFieldLeafField(field: string): field is LeafField {
  console.log(LeafFieldArr.includes(field as any), field);
  return LeafFieldArr.includes(field as any);
}

export function isMultiStringLeafField(
  field: string,
): field is MultiStringLeafFieldArr {
  return MultiStringLeafFieldArr.includes(field as any);
}

export function isIndex(data: unknown): boolean {
  if (typeof data !== "string" || data.trim() === "") return false;
  return Number.isInteger(Number(data));
}
