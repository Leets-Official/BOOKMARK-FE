import dayjs from 'dayjs';
import 'dayjs/locale/ko';

dayjs.locale('ko');

const dateList = Array.from({ length: 14 }, (_, i) => {
  const daysLater = i + 1;
  const date = dayjs().add(daysLater, 'day');
  const week = date.format('ddd');

  return {
    id: daysLater,
    content: date.format('YYYY-MM-DD'),
    visableContent: `${daysLater}일 뒤 (${week})`,
  };
});

const timeList = Array.from({ length: 24 }, (_, i) => {
  // 현재 시간을 정각으로 설정 (분, 초, 밀리초를 0으로)
  const now = dayjs().startOf('hour');
  const date = now.add(i + 1, 'hour'); // 현재 시각 기준 +1시간부터 시작
  const hour = date.hour();
  const isAM = hour < 12;
  const isHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;

  return {
    id: i + 1,
    content: date.format('HH:mm:ss.SSS'),
    visableContent: `${isAM ? '오전' : '오후'} ${isHour}시`,
  };
});

const dateOptions = [{ id: 0, content: '', visableContent: '날짜 선택' }, ...dateList];
const timeOptions = [{ id: 0, content: '', visableContent: '시간 선택' }, ...timeList];

export { dateOptions, timeOptions };
