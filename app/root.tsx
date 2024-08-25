import {
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration, useFetchers, useNavigation,
} from "@remix-run/react";
import styles from "./styles/app.css?url";
import {PageLayout} from "~/components/ui/PageLayout";
import {LinksFunction} from "@remix-run/node";
import React, {useMemo} from "react";
import NProgress from 'nprogress';
import {jwtCookie, roleCookie} from "~/lib/cookies";
import {useRouteLoaderData} from "react-router";

export const links: LinksFunction = () => [
    { rel: "stylesheet", href: styles },
];
export const loader = async ({ request }) => {
    const role = await roleCookie.parse(request.headers.get("Cookie"));
    const token = await jwtCookie.parse(request.headers.get("Cookie"));
    return {
        role,
        token
    };
};
export function Layout({ children }: { children: React.ReactNode }) {
    const navigation = useNavigation();
    const fetchers = useFetchers();
    const {role, token} = useRouteLoaderData<typeof loader>('root');

    const state = useMemo<'idle' | 'loading'>(
        function getGlobalState() {
            const states = [
                navigation.state,
                ...fetchers.map((fetcher) => fetcher.state),
            ];
            if (states.every((state) => state === 'idle')) return 'idle';
            return 'loading';
        },
        [fetchers, navigation.state],
    );

    React.useEffect(() => {
        // and when it's something else it means it's either submitting a form or
        // waiting for the loaders of the next location so we start it
        if (state === 'loading') NProgress.start();
        // when the state is idle then we can to complete the progress bar
        if (state === 'idle') NProgress.done();
    }, [state]);

    return (
    <html lang="ar">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
      <PageLayout role={role} token={token}>
          {children}
      </PageLayout>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
