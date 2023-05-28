import { cssBundleHref } from "@remix-run/css-bundle";

import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
} from "@remix-run/react";

import styles from "~/styles/main.css";
import MainNavigation from "./components/MainNavigation";

export const links = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
  {
    rel: "stylesheet",
    href: styles,
  },
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <header>
          <MainNavigation />
        </header>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  let errorElement;
  // when true, this is what used to go to `CatchBoundary`
  if (isRouteErrorResponse(error)) {
    errorElement = (
      <main>
        <p className="info-message">Something went wrong</p>
      </main>
    );
  } else {
    errorElement = (
      <main className="error">
        <h1>An error occured!</h1>
        <p>{error.message}</p>
        <p>
          Back to link <Link to="/">safety</Link>
        </p>
      </main>
    );
  }

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
        <title>Error Occured</title>
      </head>
      <body>
        <header>
          <MainNavigation />
        </header>
        {errorElement}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
