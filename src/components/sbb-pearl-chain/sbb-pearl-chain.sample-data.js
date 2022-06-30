const generateLegsData = (items) => {
  const legsData = {
    legs: [],
  };

  items.forEach((item) => {
    legsData.legs.push({
      cancellation: item[0],
      duration: item[1],
    });
  });

  return legsData;
};

export default {
  stop0: generateLegsData([[false, 100]]),
  stop1: generateLegsData([
    [false, 25],
    [false, 75],
  ]),
  stop2: generateLegsData([
    [false, 25],
    [false, 10],
    [false, 65],
  ]),
  stop3: generateLegsData([
    [false, 25],
    [false, 10],
    [false, 50],
    [false, 15],
  ]),
  stop4: generateLegsData([
    [false, 25],
    [false, 10],
    [false, 8],
    [false, 15],
    [false, 42],
  ]),
  stop9: generateLegsData([
    [false, 10],
    [false, 5],
    [false, 5],
    [false, 10],
    [false, 10],
    [false, 5],
    [false, 5],
    [false, 10],
    [false, 15],
    [false, 25],
  ]),
};
