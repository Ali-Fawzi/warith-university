import { redirect, LoaderFunction } from "@remix-run/node";
import { jwtCookie, roleCookie } from "~/lib/cookies";

export const loader: LoaderFunction = async () => {
    const headers = new Headers();

    headers.append("Set-Cookie", await jwtCookie.serialize("", { maxAge: 0 }));
    headers.append("Set-Cookie", await roleCookie.serialize("", { maxAge: 0 }));

    return redirect("/", { headers });
};

export default function SignOut() {
    return null;
}
