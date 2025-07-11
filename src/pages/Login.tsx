import React from "react";

const Login = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      <h1 className="text-6xl font-bold mb-12">Logo</h1>

      <button className="flex items-center justify-center bg-yellow-400 text-black text-sm font-semibold py-3 px-6 rounded-lg shadow hover:bg-yellow-300 transition-colors w-full max-w-xs">
        <img
          src="https://developers.kakao.com/assets/img/about/logos/kakaotalksharing/kakaotalk_sharing_btn_small.png"
          alt="Kakao"
          className="w-5 h-5 mr-2"
        />
        카카오 로그인
      </button>
    </div>
  );
};

export default Login;
