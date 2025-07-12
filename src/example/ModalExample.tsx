import Modal from '@/components/common/Modal';
import { useState } from 'react';

/*
  - 모달 컴포넌트 파라미터
    - title: 모달 컴포넌트 타이틀
    - onCancel: 취소 버튼 클릭 시 실행 함수
    - onConfirm: 확인 버튼 클릭 시 실행 함수
    - children: 모달 컴포넌트 자식 컴포넌트

  - 모달 컴포넌트 사용 예시
    - 모달을 상태를 관리하기 위해 useState를 사용하여 컴포넌트 생애주기를 관리한다.
    - 모달에 각 파라미터에 맞는 값을 전달하여 모달을 렌더링한다.
    - 모달 안에 들어갈 내용을 children 파라미터로 전달한다.
*/

const ModalExample = () => {
  // 모달 컴포넌트 상태 관리
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div>
      {isOpen && (
        <Modal
          title='가입되지 않은 계정이에요.'
          onCancel={() => {
            setIsOpen(false);
          }}
          onConfirm={() => {
            setIsOpen(true);
          }}
        >
          <p>자식 컴포넌트</p>
        </Modal>
      )}
    </div>
  );
};

export default ModalExample;
