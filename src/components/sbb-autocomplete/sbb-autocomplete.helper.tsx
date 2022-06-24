/**
 * we check the structure of the data manually, so it's save to use `any`
 * as return type
 */
export default (jsonString: string): any => {
  if (!jsonString || jsonString.length === 0) {
    console.warn('sbb-autocomplete error: the items property seems to be emtpy.');

    return [];
  }

  const jsonArray = JSON.parse(jsonString);

  if (!jsonArray || jsonArray.length < 1) {
    console.warn(
      'sbb-autocomplete error: you should pass an array of objects to the items property.'
    );

    return [];
  }

  let foundSomethingThatIsNotAnObject = false;
  let didNotFindTextKey = false;

  jsonArray.forEach((item) => {
    if (typeof item === 'object' && !Array.isArray(item) && item !== null) {
      const itemKeys = Object.keys(item);

      if (itemKeys.indexOf('text') < 0) {
        didNotFindTextKey = true;
      }
    } else {
      foundSomethingThatIsNotAnObject = true;
    }
  });

  if (foundSomethingThatIsNotAnObject || didNotFindTextKey) {
    console.warn('sbb-autocomplete error: each object in the array must contain a text property.');

    return [];
  }

  return jsonArray as any;
};
