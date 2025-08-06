import dayjs from 'dayjs';

const formatDate = (dateStr: string) => {
  const date = dayjs(dateStr);
  return date.format('MM월 DD일');
};

const formatTime = (timeStr: string) => {
  const [hours] = timeStr.split(':');
  const hour = parseInt(hours, 10);
  const isAM = hour < 12;
  const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  return `${isAM ? '오전' : '오후'} ${displayHour}시`;
};

export { formatDate, formatTime };
