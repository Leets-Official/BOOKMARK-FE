import dayjs from 'dayjs';

const formatDate = (dateStr: string) => {
  const date = dayjs(dateStr);
  const week = date.format('ddd');
  const today = dayjs();
  const diffDays = date.diff(today, 'day');

  if (diffDays === 0) {
    return '오늘';
  } else {
    return `${diffDays}일 뒤 (${week})`;
  }
};

export { formatDate };
