// src/pages/_app.tsx

// 전역 스타일 시트들을 import합니다.
import "@/styles/globals.css";
import "@/styles/tailwind.css";

// Next.js AppProps 타입을 import합니다.
import type { AppProps } from "next/app";

// 컴포넌트들을 import합니다.
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Head from "next/head";

// MyApp 컴포넌트: Next.js 앱의 모든 페이지를 감싸는 최상위 컴포넌트입니다.
function MyApp({ Component, pageProps }: AppProps) {
  // AppProps를 받아 Component와 pageProps를 props로 사용합니다.
  return (
    <>
      {/* Head 컴포넌트를 사용하여 페이지의 <head> 태그를 관리합니다. */}
      <Head>
        {/* viewport meta 태그를 추가하여 반응형 디자인을 지원합니다. */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {/* Header 컴포넌트를 렌더링합니다. */}
      <Header />
      {/* main 태그를 사용하여 페이지의 주요 내용을 감쌉니다. */}
      <main>
        {/* 현재 페이지에 해당하는 컴포넌트를 렌더링합니다. pageProps는 페이지 컴포넌트에 필요한 props를 전달합니다. */}
        <Component {...pageProps} />
      </main>
      {/* Footer 컴포넌트를 렌더링합니다. */}
      <Footer />
    </>
  );
}

// MyApp 컴포넌트를 export합니다.
export default MyApp;
