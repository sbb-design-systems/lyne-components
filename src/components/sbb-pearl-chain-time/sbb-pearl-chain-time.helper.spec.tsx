import { Notice } from '../../global/timetable';
import { extractTimeAndStringFromNoticeText } from './sbb-pearl-chain-time.helper';

describe('extractTimeAndStringFromNoticeText', () => {
  it('should return duration and text from notice', () => {
    const notice = {
      text: {
        template: 'The trip will start (10x)',
      },
    };
    const result = extractTimeAndStringFromNoticeText(notice as Notice);

    expect(result.duration).toEqual(10);
    expect(result.text).toEqual('The trip will start ');
  });

  it('should return default values when notice is undefined', () => {
    const result = extractTimeAndStringFromNoticeText(undefined);

    expect(result.duration).toEqual(0);
    expect(result.text).toEqual('');
  });
});
