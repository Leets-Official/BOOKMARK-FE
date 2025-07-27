const Loading = ({ className }: { className: string }) => {
  return (
    <div className={className}>
      <div className='w-6 h-6 border-4 border-gray-400 border-t-gray-200 rounded-full animate-spin' />
    </div>
  );
};

export default Loading;
