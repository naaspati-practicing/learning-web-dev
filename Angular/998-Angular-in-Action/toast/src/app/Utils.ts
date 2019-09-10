export function requireNonNull(
  obj: any,
  message = 'expected a non null value'
) {
  if (obj === null) {
    throw new Error(message);
  }
}

export function requireNonUndefined(
  obj: any,
  message = 'expected a non undefined value'
) {
  if (obj === undefined) {
    throw new Error(message);
  }
}

export function isEmpty(obj) {
  if(Array.isArray(obj)) {
    return obj.length === 0;
  }

  switch (typeof obj) {
    case 'string': return obj.length === 0;
    default: throw new Error('unknown type: ' + typeof obj);
  }


}
