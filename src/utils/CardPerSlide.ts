export const getCardsPerSlide = () => {
  const width = window.innerWidth;
  if (width >= 1280) return 4; // xl 이상
  if (width >= 1024) return 3; // lg
  return 2; // md, sm
};
