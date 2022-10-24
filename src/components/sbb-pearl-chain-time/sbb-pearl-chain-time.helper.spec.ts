import { formatDateForDepartureAndArrivalTime } from './sbb-pearl-chain-time.helper';

describe('formatDateForDepartureAndArrivalTime', () => {
  it('should return the right value given a date', () => {
    const date = new Date(0).getTime();
    const expected = '1970-01-01T00:00:00.000';
    expect(formatDateForDepartureAndArrivalTime(date)).toEqual(expected);
  });
});
