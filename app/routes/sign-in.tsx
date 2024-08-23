import {ActionFunction, MetaFunction} from "@remix-run/node";
import {Form, useActionData, useNavigation} from "@remix-run/react";
import {useEffect, useRef} from "react";

export const meta: MetaFunction = () => {
    return [
        { title: "جامعة وارث الانبياء" },
        { name: "الوصف", content: "اهلا بكم في جامعة وارث الانبياء في كربلاء المقدسة" },
    ];
};
export const action: ActionFunction = async ({ request }) => {
    await new Promise((res) => setTimeout(res, 1000));
    const formData = await request.formData();
    const username = formData.get("username");
    const password = formData.get("password");

    const res = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/users/sign-in`, {
        method: "post",
        body: JSON.stringify({ username, password }),
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
    });

    return res.json();

};
export default function SignIn() {
    const actionData = useActionData();
    const navigation = useNavigation();

    const state: "idle" | "success" | "error" | "submitting" = navigation.state === "submitting"
        ? "submitting"
        : actionData?.name === 'Error'
            ? "error"
            : "idle";

    const inputRef = useRef<HTMLInputElement>(null);
    const mounted = useRef<boolean>(false);

    useEffect(() => {
        if (state === "error") {
            inputRef.current?.focus();
        }

        if (state === "idle" && mounted.current) {
            inputRef.current?.select();
        }

        mounted.current = true;
    }, [state]);
    return (
        <div className='bg-white'>
            <Form
                replace
                dir='RTL'
                method="POST"
                className='mt-8 max-w-6xl py-8 mx-auto flex flex-col items-center justify-center gap-16'
            >
                <div className='flex flex-col items-center justify-center space-y-2'>
                    <div className='text-xl'>
                        <span className='text-brand'> تسجيل </span>
                        <span className='text-navy'> الدخول .</span>
                    </div>
                    <p className='font-light max-w-xs text-center'>قم بتسجيل الدخول إلى حسابك حتى تتمكن من الاستمرار في استخدام الموقع .</p>
                </div>
                <div className='flex flex-col items-center justify-center gap-8 w-full max-w-xl p-4 xl:p-0 text-right'>
                    <div className='w-full'>
                        <label htmlFor="username"
                               className="block mb-2 text-sm font-medium">اسم المستخدم</label>
                        <input
                            type="text"
                            id="username"
                            className="block p-2.5 w-full text-sm bg-formInput rounded-md border-0"
                            placeholder="اسم المستخدم"
                            required
                            name="username"
                        />
                    </div>
                    <div className='w-full'>
                        <label htmlFor="password"
                               className="block mb-2 text-sm font-medium">كلمة المرور</label>
                        <input
                            type="password"
                            id="password"
                            className="block p-2.5 w-full text-sm bg-formInput rounded-md border-0"
                            placeholder="كلمة المرور"
                            required
                            name="password"
                        />
                    </div>
                </div>
                <div className='flex flex-col items-center justify-center gap-4 relative'>
                    <div className='text-rose-500 text-center' id="error-message">
                        {state === "error" ? <div>
                            <p>حدث خطا</p>
                            <p>يرجى التاكد من صحة المعلومات و اعادة المحاولة</p>
                        </div> : ''}
                    </div>
                    <button
                        type='submit'
                        className='inline-block rounded-md font-semibold text-center py-3 px-6 bg-navy text-white hover:bg-navy/90 ease-in-out transform transition duration-500 select-none'>
                        {state === "submitting"
                            ? "يتم تسجيل الدخول..."
                            : "تسجيل الدخول"}
                    </button>
                </div>
            </Form>
        </div>
    );
}
