import { useState } from 'react';
import { BackArrowIcon, ProfileIcon, DeleteIcon, WarningIcon } from '@/assets';

interface AccountSettingPageProps {
  onClose: () => void;
}

const AccountSettingPage = ({ onClose }: AccountSettingPageProps) => {
  const [name, setName] = useState('김민수');
  const [email, setEmail] = useState('qug1t7@gmail.com');
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black/40 z-50'>
      <div className='w-[369px] h-[773px] bg-white rounded-[20px] shadow-lg px-6 py-6 relative'>
        {/* 헤더 */}
        <div className='relative flex items-center justify-center mb-10'>
          <button onClick={onClose} className='absolute left-0'>
            <BackArrowIcon className='w-12 h-12 text-black' />
          </button>
          <h2 className='text-base font-semibold'>계정설정</h2>
        </div>

        {/* 프로필 영역 */}
        <p className='text-sm text-gray-600 font-medium mb-4'>프로필</p>
        <div className='h-[1px] bg-gray-200 mb-4' />

        {/* 사진 */}
        <div className='flex flex-col items-start mb-4'>
          <p className='text-sm text-black mb-4'>사진</p>
          <ProfileIcon className='w-[100px] h-[100px] rounded-[20px] object-cover self-start' />
        </div>

        {/* 이름 입력 */}
        <div className='flex flex-col mb-6'>
          <p className='text-sm text-black mb-2'>이름</p>
          <div className='relative'>
            <input
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='w-full h-10 px-4 pr-10 border border-gray-200 rounded-xl bg-gray-50 text-gray-400 text-sm'
            />
            {name && (
              <button
                onClick={() => setName('')}
                className='absolute right-3 top-1/2 -translate-y-1/2'
              >
                <DeleteIcon className='w-4 h-4 text-gray-400' />
              </button>
            )}
          </div>
        </div>

        {/* 메일 입력 */}
        <div className='flex flex-col mb-6'>
          <p className='text-sm text-black mb-2'>메일</p>
          <div className='relative'>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full h-10 px-4 pr-10 border border-gray-200 rounded-xl bg-gray-50 text-gray-400 text-sm'
            />
            {email && (
              <button
                onClick={() => setEmail('')}
                className='absolute right-3 top-1/2 -translate-y-1/2'
              >
                <DeleteIcon className='w-4 h-4 text-gray-400' />
              </button>
            )}
          </div>
        </div>

        {/* 로그인 상태 */}
        <p className='text-sm text-gray-600 mb-2'>로그인 상태</p>
        <div className='h-[1px] bg-gray-200 mb-4' />
        <p className='text-[15px] font-medium text-black'>카카오</p>

        {/* 계정 삭제 버튼 */}
        <button className='mt-40 text-sm text-gray-300' onClick={() => setShowDeleteModal(true)}>
          계정삭제
        </button>
      </div>

      {/* 삭제 확인 모달 */}
      {showDeleteModal && (
        <div className='fixed inset-0 bg-black/30 flex items-center justify-center z-50'>
          <div className='bg-white rounded-xl w-[310px] py-6 px-5 shadow-xl text-center'>
            <div className='flex justify-center mb-4'>
              <div className='w-10 h-10 bg-red-100 rounded-full flex items-center justify-center'>
                <WarningIcon className='text-red-500 w-10 h-10' />
              </div>
            </div>
            <p className='text-[15px] font-semibold text-black mb-2'>
              정말 계정을 삭제하시겠습니까?
            </p>
            <p className='text-[13px] text-gray-500 mb-6 leading-[1.4]'>
              이 계정에 관련한 모든 내용은 영구삭제되며,
              <br />
              복구하실 수 없습니다
            </p>
            <div className='h-[1px] bg-gray-200 mb-3' />
            <div className='flex justify-end gap-2'>
              <button
                onClick={() => setShowDeleteModal(false)}
                className='px-4 h-8 rounded-xl border border-gray-300 text-sm text-black'
              >
                취소
              </button>
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  alert('삭제되었습니다.');
                }}
                className='px-4 h-8 rounded-xl bg-red-500 text-white text-sm'
              >
                삭제하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountSettingPage;
