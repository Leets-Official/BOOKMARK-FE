import { BackArrow2Icon, LogoutIcon, ImageIcon, DeleteIcon, Delete2Icon } from '@/assets';
import AccountSettingPage from './AccountSettingPage';
import { useState } from 'react';

interface MyPageProps {
  onClose: () => void;
}

const MyPage = ({ onClose }: MyPageProps) => {
  const [showAccountSetting, setShowAccountSetting] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [contactEmail, setContactEmail] = useState('insightboxxx@gmail.com');

  const handleOpenAccountSetting = () => setShowAccountSetting(true);
  const handleCloseAccountSetting = () => setShowAccountSetting(false);

  const handleOpenContactModal = () => setShowContactModal(true);
  const handleCloseContactModal = () => setShowContactModal(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(contactEmail);
    alert('이메일이 복사되었습니다!');
  };

  return (
    <>
      {!showAccountSetting && (
        <div className='w-[369px] h-[773px] bg-white rounded-[20px] shadow-lg px-5 pt-6 pb-4 flex flex-col relative'>
          {/* 헤더 */}
          <div className='relative flex items-center justify-center mb-10'>
            <button onClick={onClose} className='absolute left-0'>
              <BackArrow2Icon className='w-12 h-12 text-black' />
            </button>
            <h2 className='text-base font-semibold text-center'>마이페이지</h2>
          </div>

          {/* 프로필 카드 */}
          <div
            onClick={handleOpenAccountSetting}
            className='bg-white rounded-[20px] flex items-center py-6 px-5 mb-18 cursor-pointer'
            style={{ boxShadow: '0px 0px 12px rgba(0, 0, 0, 0.18)' }}
          >
            <ImageIcon className='w-[105px] h-[105px] mr-4 rounded-[20px] object-cover' />
            <div>
              <p className='font-semibold text-[18px] leading-tight'>김민수</p>
              <div className='h-[8px]' />
              <p className='text-sm text-black'>qug1t7@gmail.com</p>
            </div>
          </div>

          {/* 관리 섹션 */}
          <div className='mb-15'>
            <p className='text-xs text-gray-500 mb-2'>관리</p>
            <div className='mt-2 h-[1px] bg-gray-200 rounded-full' />
            <p className='mt-4 text-[13px] font-medium text-gray-700'>카테고리 / 태그 관리</p>
          </div>

          {/* 문의 섹션 */}
          <div className='mb-auto'>
            <p className='text-xs text-gray-500 mb-2'>문의</p>
            <div className='mt-2 h-[1px] bg-gray-200 rounded-full' />
            <p
              className='mt-4 text-[13px] font-medium text-gray-700 cursor-pointer'
              onClick={handleOpenContactModal}
            >
              문의하기
            </p>
          </div>

          {/* 로그아웃 버튼 */}
          <button className='mt-6 h-[40px] px-4 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 flex items-center gap-2 self-start'>
            <LogoutIcon className='w-5 h-5' />
            로그아웃
          </button>
        </div>
      )}

      {/* Account Setting 모달 */}
      {showAccountSetting && (
        <div className='fixed inset-0 flex items-center justify-center bg-black/20 z-50'>
          <div className='w-[369px] h-[773px] bg-white rounded-[20px] shadow-lg px-6 py-6'>
            <AccountSettingPage onClose={handleCloseAccountSetting} />
          </div>
        </div>
      )}

      {/* 문의하기 모달 */}
      {showContactModal && (
        <div className='fixed inset-0 bg-black/30 flex items-center justify-center z-50'>
          <div className='w-[330px] bg-white rounded-[20px] shadow-md pt-6 pb-0 relative flex flex-col px-0'>
            <div className='flex justify-between items-center mb-4 px-6'>
              <h3 className='text-[15px] font-semibold text-center flex-1'>문의하기</h3>
              <button onClick={handleCloseContactModal} className='ml-auto px-6'>
                <DeleteIcon width={20} height={20} className='w-5 h-5 text-black' />
              </button>
            </div>

            <div className='relative mb-1 px-6'>
              <input
                type='text'
                value={contactEmail}
                maxLength={50}
                onChange={(e) => setContactEmail(e.target.value)}
                className='w-full text-sm text-gray-500 px-4 py-3 border border-gray-200 rounded-xl bg-gray-100 pr-10'
              />
              {contactEmail && (
                <button
                  onClick={() => setContactEmail('')}
                  className='absolute right-9 top-1/2 -translate-y-1/2'
                  aria-label='Clear input'
                >
                  <Delete2Icon className='w-4 h-4 text-gray-400' />
                </button>
              )}
            </div>

            <p className='text-xs text-gray-400 mb-4 text-right select-none px-6'>
              {contactEmail.length} / 10
            </p>

            <button
              onClick={handleCopy}
              className='w-full h-[44px] bg-[#2F70FF] text-white rounded-b-[20px] text-sm font-semibold mt-auto'
            >
              복사하기
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default MyPage;
