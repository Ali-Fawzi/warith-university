import {jwtCookie} from "~/lib/cookies";

export function missingClass(string?: string, prefix?: string) {
    if (!string) {
        return true;
    }

    const regex = new RegExp(` ?${prefix}`, 'g');
    return string.match(regex) === null;
}
export function formatDateToDDMMYYYY(dateStr: string) {
    const date = new Date(dateStr);

    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getUTCFullYear();

    return `${day}-${month}-${year}`;
}
export function getDayName(dateString: string) {
    const date = new Date(dateString);
    const options = { weekday: 'long' };
    return new Intl.DateTimeFormat('ar', options).format(date);
}
export async function refreshToken(request) {
    const token = await jwtCookie.parse(request.headers.get("Cookie"));

    if (!token) {
        throw new Response("Unauthorized", { status: 401 });
    }

    const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/users/referesh-token`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Response(token, { status: response.status });
    }

    const { token: newToken } = await response.json();

    return {
        headers: {
            "Set-Cookie": await jwtCookie.serialize(newToken),
        },
    };
}