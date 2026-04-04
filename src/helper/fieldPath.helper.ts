import { FIELD_PATH_MAP, type SingleStringLeafField } from "../types";

export function getFieldPath(leafField: SingleStringLeafField): string {
  const path = FIELD_PATH_MAP[leafField];
  if (!path) throw new Error(`No field path for: ${leafField}`);
  return path;
}
