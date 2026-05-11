'use client';

import style from "@/app/page.module.css"

// 기본적으로 Server 컴포넌트
// 인터렉션 상호작용 기능은 Server 컴포넌트에서 불가능
// use client로 변환해서 클라이언트 컴포넌트로 바꿔줄 수 있음
export default function Home() {
  console.log('인덱스 페이지 컴포넌트');

  return (
    <div>
      <h1>Hello Next.js!</h1>
      <p>Index Page</p>
      <button onClick={(() => { console.log("클릭"); })}>클릭</button>
    </div>
  );
}
