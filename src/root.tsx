// @refresh reload
import { Suspense } from "solid-js";
import {
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
import { QueryClient, QueryClientProvider } from '@tanstack/solid-query';

const queryClient = new QueryClient();

export default function Root() {
  return (
    <Html lang="en">
      <Head>
        <Title>Hotel Flower</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
        <Link rel="preconnect" href="https://fonts.googleapis.com" />
        <Link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossorigin="anonymous"
        />
        <Link
          as="style"
          rel="stylesheet preload prefetch"
          href="https://fonts.googleapis.com/css2?family=Shippori+Mincho&display=swap&text=HOTEL+FLOWER"
          crossorigin="anonymous"
          type="text/css"
        />
        <Link
          as="style"
          rel="stylesheet preload prefetch"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap&subset=latin"
          crossorigin="anonymous"
          type="text/css"
        />
        <Link
          as="style"
          rel="stylesheet preload prefetch"
          href="https://fonts.googleapis.com/css2?family=Rufina:wght@400&display=swap&subset=latin&text=WHERE+SOMETHING+INCREDIBLE+HAPPENS"
          crossorigin="anonymous"
          type="text/css"
        />
      </Head>
      <Body class="font-inter">
        <Suspense>
          <ErrorBoundary>
            <QueryClientProvider client={queryClient}>
              <Routes>
                <FileRoutes />
              </Routes>
            </QueryClientProvider>
          </ErrorBoundary>
        </Suspense>
        <Scripts />
      </Body>
    </Html>
  );
}
