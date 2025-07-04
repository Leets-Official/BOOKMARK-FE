import Modal from '@/components/common/Modal';
import { useState } from 'react';

/*
  - 모달 컴포넌트 파라미터
    - text: 모달 컴포넌트 타이틀
    - subText: 모달 컴포넌트 서브 타이틀
    - cancelButtonText: 취소 버튼 텍스트
    - confirmButtonText: 확인 버튼 텍스트
    - onCancel: 취소 버튼 클릭 시 실행 함수
    - onConfirm: 확인 버튼 클릭 시 실행 함수

  - 모달 컴포넌트 사용 예시
    - 모달을 상태를 관리하기 위해 useState를 사용하여 컴포넌트 생애를 관리한다.
    - 모달에 각 파라미터에 맞는 값을 전달하여 모달을 렌더링한다.
*/

const ModalExample = () => {
  // 모달 컴포넌트 상태 관리
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div>
      {isOpen && (
        <Modal
          text='가입되지 않은 계정이에요.'
          subText='회원가입을 진행할까요?'
          cancelButtonText='취소'
          confirmButtonText='회원가입 하기'
          onCancel={() => {
            setIsOpen(false);
          }}
          onConfirm={() => {
            setIsOpen(true);
          }}
        />
      )}
    </div>
  );
};

export default ModalExample;
