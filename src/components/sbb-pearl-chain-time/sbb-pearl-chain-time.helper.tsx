import { Notice } from '../../global/timetable';

export const extractTimeAndStringFromNoticeText = (
  notice: Notice,
): { duration: number; text: string } => {
  const firstIndex = notice?.text?.template && notice.text.template.indexOf('(') + 1;
  const noticeDuration = notice?.text?.template?.substring(
    firstIndex || 0,
    notice?.text?.template.indexOf(')'),
  );

  const noticeObject = {
    duration: (noticeDuration && +noticeDuration.substring(0, noticeDuration.length - 1)) || 0,
    text: notice?.text?.template?.split('(')[0] || '',
  };
  return noticeObject;
};
