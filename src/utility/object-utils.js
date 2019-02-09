export const isNullOrUndefined = obj => {
  return obj === undefined || obj === null;
};

export const isNullOrEmpty = objArray => {
  if (isNullOrUndefined(objArray)) return true;

  if (!Array.isArray(objArray)) throw "Object must be an array";

  return objArray.length === 0;
};

export const isNullOrEmptyString = obj => {
  if (isNullOrUndefined(obj)) return true;

  if (typeof obj !== "string") throw "Object must be string";

  return obj.length === 0;
};
