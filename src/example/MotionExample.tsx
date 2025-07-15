import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ExpandableCard = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-8'>
      <div className='max-w-md mx-auto'>
        <motion.div
          layout
          className='bg-white rounded-xl shadow-lg overflow-hidden'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* 헤더 부분 */}
          <div className='p-6 bg-gradient-to-r from-purple-500 to-blue-500 text-white'>
            <div className='flex items-center justify-between'>
              <div>
                <h2 className='text-xl font-bold'>프로젝트 카드</h2>
                <p className='text-purple-100 mt-1'>클릭하여 더 많은 정보를 확인하세요</p>
              </div>
            </div>
          </div>

          {/* 항상 보이는 기본 콘텐츠 */}
          <div className='p-6'>
            <div className='flex items-center space-x-3 mb-4'>
              <div className='w-12 h-12 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full flex items-center justify-center'>
                <span className='text-white font-bold text-lg'>P</span>
              </div>
              <div>
                <h3 className='font-semibold text-gray-800'>React 프로젝트</h3>
                <p className='text-gray-500 text-sm'>2024년 1월 시작</p>
              </div>
            </div>

            <p className='text-gray-600 mb-4'>
              Framer Motion을 활용한 인터랙티브 UI 컴포넌트 개발 프로젝트입니다.
            </p>

            {/* 확장 버튼 */}
            <motion.button
              onClick={toggleExpanded}
              className='w-full flex items-center justify-center space-x-2 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-200'
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>{isExpanded ? '접기' : '자세히 보기'}</span>
            </motion.button>
          </div>

          {/* 확장 가능한 콘텐츠 */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className='overflow-hidden'
              >
                <div className='px-6 pb-6 space-y-6'>
                  {/* 구분선 */}
                  <div className='border-t border-gray-200'></div>

                  {/* 추가 정보 */}
                  <div className='space-y-4'>
                    <div>
                      <h4 className='font-semibold text-gray-800 mb-2'>프로젝트 상세 정보</h4>
                      <div className='space-y-2'>
                        <div className='flex justify-between'>
                          <span className='text-gray-600'>진행률</span>
                          <span className='font-medium text-green-600'>75%</span>
                        </div>
                        <div className='flex justify-between'>
                          <span className='text-gray-600'>팀원 수</span>
                          <span className='font-medium'>4명</span>
                        </div>
                        <div className='flex justify-between'>
                          <span className='text-gray-600'>마감일</span>
                          <span className='font-medium'>2024년 12월 31일</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default ExpandableCard;
