import {ActionFunctionArgs, redirect} from "@remix-run/node";

export async function action({
     request,
 }: ActionFunctionArgs) {
    const body = await request.formData();
    const message = await sendMessage(body);
    return redirect(`/contact-us`);
}
async function sendMessage(body: FormData) {
    console.log(body);
}