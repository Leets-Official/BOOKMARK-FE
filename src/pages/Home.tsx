import Card from '@/components/layout/card/Card';
import TestImage from '@/assets/test.jpg';

const Home = () => {
  const cardList = [
    {
      id: 1,
      title: 'React Lifecycle 정리',
      platform: '티스토리',
      image: TestImage,
      isLoading: false,
    },
    {
      id: 2,
      title: 'Vue3 Composition API',
      platform: 'Velog',
      image: TestImage,
      isLoading: true,
    },
    {
      id: 3,
      title: 'Next.js App Router',
      platform: 'GitHub Blog',
      isLoading: false,
    },
  ];
  return (
    <div className='flex flex-col items-center justify-center min-h-screen gap-6'>
      {cardList.map((card) => (
        <Card
          key={card.id}
          title={card.title}
          platform={card.platform}
          image={card.image}
          isLoading={card.isLoading}
        />
      ))}
    </div>
  );
};

export default Home;
