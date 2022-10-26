/**
 * Format dates in an acceptable way for 'departure-time' and 'arrival-time' parameters.
 * @param date date in milliseconds.
 * @returns {string} date as string in ISO format, with Z letter removed.
 */
export const formatDateForDepartureAndArrivalTime = (date: number): string => {
  return new Date(date).toISOString().replace('Z', '');
};
