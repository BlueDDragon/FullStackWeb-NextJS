# 📘 Next.js 학습 정리

> 클라우드 기반 생성형 AI 활용 웹개발 실무 프로젝트 — Next.js 핵심 개념 정리

---

## 목차

1. [Next.js란?](#1-nextjs란)
2. [렌더링 방식 비교](#2-렌더링-방식-비교)
3. [Pages Router vs App Router](#3-pages-router-vs-app-router)
4. [동적 라우팅](#4-동적-라우팅)
5. [번들 분할 & 프리페칭](#5-번들-분할--프리페칭)
6. [Data Fetching](#6-data-fetching)
7. [타입 단언 (Type Assertion)](#7-타입-단언-type-assertion)
8. [주요 명령어](#8-주요-명령어)

---

## 1. Next.js란?

**Next.js**는 React 기반의 풀스택 웹 애플리케이션 **Meta Framework**입니다.

- **개발사**: Vercel (미국)
- **특징**: SSR, SSG, CSR 등 다양한 렌더링 전략을 유연하게 지원
- **파일/폴더 기반 자동 라우팅** 시스템 내장
- SEO 최적화 및 초기 로딩 성능에 유리
- 실제 서비스에서 React와 함께 가장 많이 사용되는 프레임워크

### 프로젝트 생성

```bash
npx create-next-app@latest my-app
```

> 프로젝트 이름은 소문자로 작성해야 합니다.

---

## 2. 렌더링 방식 비교

### CSR (Client-Side Rendering)

브라우저(클라이언트)가 JS를 받아 직접 화면을 렌더링하는 방식입니다.

| # | 주체 | 내용 |
|---|------|------|
| 1 | 사용자 → 서버 | 초기 접속 요청 |
| 2 | 서버 → 브라우저 | `index.html` 반환 (빈 화면) |
| 3 | 서버 → 브라우저 | JS 번들 반환 |
| 4 | 브라우저 | JS 실행 → 콘텐츠 렌더링 |

- ✅ 서버 부하 감소, 페이지 전환이 빠름
- ❌ 초기 로딩이 느림, SEO에 불리

```tsx
// CSR 예시 — 브라우저에서 데이터를 직접 fetching
'use client';

import { useEffect, useState } from 'react';

export default function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('/api/posts')
      .then(res => res.json())
      .then(data => setPosts(data));
  }, []);

  return <ul>{posts.map(p => <li key={p.id}>{p.title}</li>)}</ul>;
}
```

---

### SSR (Server-Side Rendering)

서버가 요청 시마다 HTML을 완성해서 브라우저에 전달하는 방식입니다.

| # | 주체 | 내용 |
|---|------|------|
| 1 | 사용자 → 프론트 서버 | 초기 접속 요청 |
| 2 | 프론트 서버 | JS 실행 + 데이터 fetch |
| 3 | 프론트 서버 → 브라우저 | 완성된 HTML 반환 |
| 4 | 브라우저 → 사용자 | 화면 렌더링 FCP(상호작용 불가) |
| 5 | 브라우저 | JS 번들 수화(Hydration) |
| 6 | 브라우저 → 사용자 | TTI(상호작용 가능) |

- ✅ 초기 로딩 빠름, SEO에 유리
- ❌ 매 요청마다 서버 연산 필요

```tsx
// Pages Router — SSR 예시
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch(`https://api.example.com/posts`);
  const posts = await res.json();
  return { props: { posts } };
};

export default function Page({
  posts,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return <ul>{posts.map(p => <li key={p.id}>{p.title}</li>)}</ul>;
}
```

```tsx
// App Router — SSR 예시 (async Server Component)
// app/posts/page.tsx
export default async function Page() {
  const posts = await fetch('https://api.example.com/posts', {
    cache: 'no-store', // 매 요청마다 새로 가져옴 (SSR)
  }).then(res => res.json());

  return <ul>{posts.map((p: any) => <li key={p.id}>{p.title}</li>)}</ul>;
}
```

---

### SSG (Static Site Generation)

**빌드 타임**에 미리 HTML을 생성해두는 방식입니다.

| 시점 | 주체 | 내용 |
|------|------|------|
| 빌드 타임 | 프론트 서버 → 백서버 | API 요청 → HTML 미리 생성 |
| 런타임 | 사용자 → 프론트 서버 | 미리 만든 HTML 즉시 반환 |

- ✅ 가장 빠른 응답 속도, CDN 캐싱 용이
- ❌ 빌드 후 데이터 갱신 불가 (ISR로 보완 가능)

```tsx
// App Router — SSG 예시
// app/posts/page.tsx
export default async function Page() {
  const posts = await fetch('https://api.example.com/posts', {
    cache: 'force-cache', // 빌드 타임에 캐싱 (SSG, 기본값)
  }).then(res => res.json());

  return <ul>{posts.map((p: any) => <li key={p.id}>{p.title}</li>)}</ul>;
}
```

> **💡 ISR (Incremental Static Regeneration)**
> SSG의 단점(데이터 갱신 불가)을 보완합니다. `revalidate` 옵션으로 일정 주기마다 페이지를 재생성합니다.
>
> ```tsx
> // 60초마다 페이지 재생성
> const posts = await fetch('https://api.example.com/posts', {
>   next: { revalidate: 60 },
> }).then(res => res.json());
> ```

---

### 렌더링 방식 한눈에 비교

| 방식 | 렌더링 시점 | SEO | 속도 | 데이터 최신성 |
|------|------------|-----|------|--------------|
| CSR  | 브라우저 (런타임) | ❌ | 초기 느림 | 항상 최신 |
| SSR  | 서버 (요청 시마다) | ✅ | 보통 | 항상 최신 |
| SSG  | 서버 (빌드 타임) | ✅ | 매우 빠름 | 빌드 시점 기준 |
| ISR  | 서버 (주기적 재생성) | ✅ | 빠름 | 주기적 갱신 |

---

## 3. Pages Router vs App Router

| 항목 | Pages Router (`pages/`) | App Router (`app/`) |
|------|------------------------|----------------------|
| 기본 실행 환경 | 브라우저 (클라이언트) | 서버 |
| 권장 버전 | Next.js 12 이하, 13 지원 | **Next.js 13+ 권장** |
| 라우팅 방식 | 파일 기반 (`index.jsx`) | 디렉토리 + 파일 기반 (`page.jsx`) |
| 서버 컴포넌트 | ❌ 미지원 | ✅ 기본 지원 |
| API Routes | `pages/api/` | `app/api/` |
| 레이아웃 | `_app.js` | `layout.tsx` |
| 동적 라우팅 | `pages/blog/[id].jsx` | `app/blog/[id]/page.jsx` |
| 데이터 패칭 | `getServerSideProps`, `getStaticProps` | `fetch()` 직접 사용 |

### App Router 레이아웃 예시

```tsx
// app/layout.tsx — 모든 페이지에 공통 적용
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <header>공통 헤더</header>
        <main>{children}</main>
        <footer>공통 푸터</footer>
      </body>
    </html>
  );
}
```

### 클라이언트 컴포넌트 선언

App Router에서는 기본이 **서버 컴포넌트**이므로, `useState` / `useEffect` 등 브라우저 API 사용 시 반드시 `'use client'`를 선언해야 합니다.

```tsx
'use client'; // 브라우저에서 동작하는 클라이언트 컴포넌트 선언

import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>클릭: {count}</button>;
}
```

---

## 4. 동적 라우팅

### 기본 동적 라우팅

```
app/blog/[id]/page.tsx  →  /blog/1, /blog/42, /blog/hello
```

```tsx
// app/blog/[id]/page.tsx
export default function BlogPost({ params }: { params: { id: string } }) {
  return <h1>포스트 ID: {params.id}</h1>;
}
```

---

### Catch-all vs Optional Catch-all

| 패턴 | 파일 경로 | `/post` | `/post/1` | `/post/1/2` |
|------|----------|---------|-----------|-------------|
| Catch-all | `[...slug]` | ❌ 404 | `["1"]` | `["1","2"]` |
| Optional Catch-all | `[[...slug]]` | ✅ `undefined` | `["1"]` | `["1","2"]` |

```tsx
// app/post/[...slug]/page.tsx — Catch-all (최소 1개 세그먼트 필요)
export default function Page({ params }: { params: { slug: string[] } }) {
  return <p>slug: {params.slug.join(' / ')}</p>;
}
```

```tsx
// app/post/[[...slug]]/page.tsx — Optional Catch-all (세그먼트 없어도 OK)
export default function Page({ params }: { params: { slug?: string[] } }) {
  if (!params.slug) return <p>전체 목록 페이지</p>;
  return <p>slug: {params.slug.join(' / ')}</p>;
}
```

---

## 5. 번들 분할 & 프리페칭

Next.js는 **페이지 단위로 JS 번들을 자동 분할**합니다. 처음부터 모든 코드를 내려받지 않아 초기 로딩이 빨라집니다.

### 프리페칭 (Prefetching)

`<Link>` 컴포넌트를 사용하면, 해당 링크가 뷰포트에 들어오는 순간 목적지 페이지의 JS 번들을 **미리 다운로드**합니다. 페이지 이동이 즉각적으로 느껴지는 이유입니다.

```tsx
import Link from 'next/link';

export default function Nav() {
  return (
    <nav>
      {/* 뷰포트 진입 시 /about 번들을 미리 로드 */}
      <Link href="/about">소개</Link>
      <Link href="/blog">블로그</Link>
    </nav>
  );
}
```

> ⚠️ `<a>` 태그를 직접 사용하면 프리페칭이 적용되지 않습니다. 내부 링크는 항상 `<Link>`를 사용하세요.

---

## 6. Data Fetching

### Pages Router — `getServerSideProps`

매 요청마다 서버에서 데이터를 가져와 props로 전달합니다.  
서버 함수이므로 `useRouter` 같은 브라우저 훅은 사용 불가 — 대신 `context`를 활용합니다.

```tsx
import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { q } = context.query; // URL 쿼리 파라미터 접근
  const res = await fetch(`https://api.example.com/search?q=${q}`);
  const data = await res.json();
  return { props: { data } };
};

export default function SearchPage({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return <div>{JSON.stringify(data)}</div>;
}
```

### App Router — Server Component 직접 fetch

```tsx
// app/search/page.tsx
export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const q = searchParams.q ?? '';
  const data = await fetch(`https://api.example.com/search?q=${q}`, {
    cache: 'no-store',
  }).then(res => res.json());

  return <div>{JSON.stringify(data)}</div>;
}
```

---

## 7. 타입 단언 (Type Assertion)

TypeScript에서 `as` 키워드로 타입을 명시적으로 지정할 수 있습니다.

```ts
// 기본 사용법
const q = router.query.q as string;
```

> ⚠️ `as`는 실제 타입 변환이 아닙니다. 런타임에서 값이 `undefined`여도 TypeScript는 오류를 잡지 못합니다.

```ts
// ❌ 위험: q가 undefined일 수 있음
const q = router.query.q as string;

// ✅ 안전한 방법: 타입 가드 사용
const q = typeof router.query.q === 'string' ? router.query.q : '';
```

---

## 8. 주요 명령어

```bash
# 개발 서버 실행
npm run dev

# 특정 포트로 개발 서버 실행
npm run dev -- --port 3000

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행 (빌드 후)
npm run start

# 특정 포트 프로세스 종료
npx kill-port 3000
```

---

## 참고 자료

- [Next.js 공식 문서](https://nextjs.org/docs)
- [App Router 마이그레이션 가이드](https://nextjs.org/docs/app/building-your-application/upgrading/app-router-migration)
- [Vercel 배포 가이드](https://vercel.com/docs)
