import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <link
          href="https://fonts.cdnfonts.com/css/euclid-circular-b"
          rel="stylesheet"
        />
        <link
          href="https://fonts.cdnfonts.com/css/segoe-ui-4"
          rel="stylesheet"
        />
        <link
          href="https://fonts.cdnfonts.com/css/liberation-sans"
          rel="stylesheet"
        />
        <link
          href="https://fonts.cdnfonts.com/css/myriad-pro"
          rel="stylesheet"
        />
        <link href="https://fonts.cdnfonts.com/css/sf-pro-display" rel="stylesheet" />

        <link href="https://fonts.cdnfonts.com/css/manrope" rel="stylesheet" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100..900;1,100..900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=League+Spartan:wght@100..900&display=swap&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400..800&display=swap"
          rel="stylesheet"
        />

        <link
          href="https://cdn.jsdelivr.net/npm/@fontsource/noto-sans@5.1.0/400.min.css"
          rel="stylesheet"
        ></link>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
