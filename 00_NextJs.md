### Next.js
- 리액트 기반으로 만들어진 웹 애플리케이션 Meta Framework
- Vercel(미국)사에서 제작 및 지속적 업데이트
- SSR(Server-Side Rendering)과 SSG(Static Site Generation)을 기본적으로 지원
    - CSR : 클라이언트가 렌더링을 하는 방식 (트래픽 감소)
        1. 사용자 > 서버 : 초기 접속 요청
        2. 서버 > 브라우저 : index.html 반환
        3. 브라우저 > 사용자 : 빈화면 렌더링
        4. 서버 > 브라우저 : js bundle 반환
        5. 브라우저 : js bundle 실행
        6. 브라우저 > 사용자 : 콘텐츠 렌더링
    - SSR : 서버쪽에서 렌더링 하여 화면을 보여주는 방식 (로딩속도가 빠르고 검색엔진 최적화 가능)
        - 사전 렌더링
        1. 사용자 > 서버 : 초기 접속 요청
        2. 서버 : js 실행
        3. 서버 > 브라우저 : 완성된 html 반환
        4. 브라우저 > 사용자 : 화면 렌더링(FCP), 상호작용 불가능
        5. 서버 > 브라우저 : js bundle 반환
        6. 브라우저 : 수화(hydration)
        7. 브라우저 > 사용자 : 상호작용 가능(TTI)
        - 쾌적환 페이지 이동
        1. 사용자 > 브라우저 : 페이지 이동 요청
        2. 브라우저 : js 실행(컴포넌트 교체)
        3. 브라우저 > 사용자 : 페이지 교체, 리렌더링
- SEO(Search Engine Optimization, 검색 엔진 최적화) 및 초기 로딩 성능에 유리
- 파일(Page)/폴더(App) 기반 자동 라우팅 시스템 제공
- 리액트로 실제 서비스를 만들 때 가장 많이 사용하는 프레임워크
- npx create-next-app@latest {프로젝트 이름(소문자)}

### Pages Router vs App Router
- Pages Router(pages/)
    - 사용 버전 : Next.js 12 이하, Next.js 13에서 지원
    - 라우팅 방식 : 파일 기반(index.jsx)
    - 서버 컴포넌트 : 지원 안됨
    - API Routes : pages/api/ 내에서 지원
    - 레이아웃 적용 : _app.js 로 적용
    - 동적 라우팅 : pages/blog/[id].jsx
    - 데이터 패칭 : getServerSideProps, getStaticProps
- App Router (app/)
    - 사용 버전 : Next.js 13+ 추천
    - 라우팅 방식 : 디렉토리+ 파일 기반(pages.jsx)
    - 서버 컴포넌트 : 기본 지원
    - API Routes : app/api/ 내에서 지원
    - 레이아웃 적용 : layouts.jsx 로 적용
    - 동적 라우팅 : app/blog/[id]/page.jsx
    - 데이터 패칭 : fetch() 직접 사용 가능

### Catch-all vs Optional Catch-all
- Catch-all([...slug])
    - 경로 예시 : /app/post/[...slug]/page.tsx
    - /post (파라미터 없음) : 매칭 안됨 (404)
    - /post/1 : ["1"]
    - /post/1/2 : ["1", "2"]
    - 핵심 요약 : 최소 1개 이상의 세그먼트가 필요함
- Optional Catch-all([[...slug]])
    - 경로 예시 : /app/post/[[...slug]]/page.tsx
    - /post (파라미터 없음) : 매칭됨 (undefined)
    - /post/1 : ["1"]
    - /post/1/2 : ["1", "2"]
    - 핵심 요약 : 세그먼트가 없어도 매칭됨 (선택적)

    ### 페이지 단위로 번들 분할
    - js bundle의 크기가 커질 때 페이지 단위로 번들을 분할
    - 프리페칭 : 현재 페이지에서 이동 가능한 js bundle을 미리 불러옴
        - Link 컴포넌트를 사용하면 해당 라우터를 프리페칭함