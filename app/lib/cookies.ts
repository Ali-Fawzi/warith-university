import {createCookie} from "@remix-run/node";

export const jwtCookie = createCookie("jwt", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 ,
});
export const roleCookie = createCookie("role", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 ,
});
export const statusCookie = createCookie("status", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 ,
});