import RootLayout from "../components/global-layout"
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { NextPage } from "next";

// 타입 결합
type NextPageWithLayout = NextPage & { getLayout: (page: React.ReactNode) => React.ReactNode };

export default function App({ Component, pageProps }: AppProps & { Component: NextPageWithLayout }) {
  const getLayout = Component.getLayout || ((page) => page); // 단축평가

  return (
    <RootLayout>
      {getLayout(<Component {...pageProps} />)}
    </RootLayout>
  );
}
