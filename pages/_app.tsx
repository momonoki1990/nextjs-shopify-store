import "styles/global.css";
import "tailwindcss/tailwind.css";
// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";

import nProgress from "nprogress";
import { useRouter } from "next/router";
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    router.events.on("routeChangeStart", nProgress.start);
    router.events.on("routeChangeComplete", nProgress.done);
    router.events.on("routeChangeError", nProgress.done);

    return () => {
      router.events.off("routeChangeStart", nProgress.start);
      router.events.off("routeChangeComplete", nProgress.done);
      router.events.off("routeChangeError", nProgress.done);
    };
  }, [router]);

  return <Component {...pageProps} />;
}

export default MyApp;
