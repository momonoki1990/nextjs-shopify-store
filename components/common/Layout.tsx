import { ReactNode } from "react";
import Head from "next/head";
import Header from "components/common/Header/Header";
import Footer from "components/common/Footer/Footer";

type Props = {
  children: ReactNode;
  title?: string;
};

const Layout: React.FC<Props> = ({
  children,
  title = "Nextjs Shopify Store",
}) => (
  <>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Header />
    <main className="py-9 md:py-14">{children}</main>
    <Footer />
  </>
);

export default Layout;
