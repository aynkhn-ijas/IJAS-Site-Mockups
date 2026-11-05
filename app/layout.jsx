import Layout from "@/components/Layout";
import "../src/index.css";

export const metadata = {
  title: {
    default: "Illinois Junior Academy of Science",
    template: "%s | Illinois Junior Academy of Science",
  },
  description:
    "Illinois Junior Academy of Science — statewide science expositions, membership, and State Exposition awards.",
  icons: { icon: "/ijas-seal.png" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Wix+Madefor+Text:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
