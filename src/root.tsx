// @refresh reload
import { Suspense } from "solid-js";
import {
  useLocation,
  A,
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Meta,
  Routes,
  Scripts,
  Title,
  Link,
} from "solid-start";
import "./root.css";

export default function Root() {
  const location = useLocation();

  return (
    <Html lang="en">
      <Head>
        <Title>SolidStart - With TailwindCSS</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
        <Link rel="preload" href="/fonts/Shippori_Mincho/ShipporiMincho-Regular.ttf" as="font" type="font/ttf" crossOrigin='' />
        <Link rel="preload" href="/fonts/Roboto/Roboto-Regular.ttf" as="font" type="font/ttf" crossOrigin='' />
        <Link rel="preload" href="/fonts/Rufina/Rufina-Regular.ttf" as="font" type="font/ttf" crossOrigin='' />
      </Head>
      <Body class="font-roboto">
        <Suspense>
          <ErrorBoundary>
            <Routes>
              <FileRoutes />
            </Routes>
          </ErrorBoundary>
        </Suspense>
        <Scripts />
      </Body>
    </Html>
  );
}
