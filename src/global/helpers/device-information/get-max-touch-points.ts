/**
 * For now the detection is as simple as that.
 * Be aware that this will include hybrid
 * devices as well. Read more about this here:
 * https://mzl.la/3H9jo7x
 */

const getMaxTouchPoints = (): number => navigator.maxTouchPoints;

export default getMaxTouchPoints;
