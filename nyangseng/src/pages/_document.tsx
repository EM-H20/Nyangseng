// src/pages/_document.tsx

import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* 구글 애드센스 코드 삽입 */}
          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3160072148057409"
            crossOrigin="anonymous"
          ></script>
          {/* 애드센스 페이지 수준 광고 코드 (선택 사항) */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (adsbygoogle = window.adsbygoogle || []).push({
                  google_ad_client: "ca-pub-3160072148057409",
                  enable_page_level_ads: true
                });
              `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
