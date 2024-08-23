import {ActionFunction, MetaFunction} from "@remix-run/node";
import {Form, useActionData, useNavigation} from "@remix-run/react";
import clsx from "clsx";
import {useEffect, useRef, useState} from "react";

export const meta: MetaFunction = () => {
    return [
        { title: "جامعة وارث الانبياء" },
        { name: "الوصف", content: "اهلا بكم في جامعة وارث الانبياء في كربلاء المقدسة" },
    ];
};
export const action: ActionFunction = async ({ request }) => {
    await new Promise((res) => setTimeout(res, 1000));
    const formData = await request.formData();
    const name = formData.get("name");
    const username = formData.get("username");
    const password = formData.get("password");
    const role = formData.get("role");
    const jobTitle = formData.get("jobTitle");
    const linkedIn = formData.get("linkedIn");
    const website = formData.get("website");
    const bio = formData.get("bio");
    const email = formData.get("email");

    const res = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/users/sign-up`, {
        method: "post",
        body: JSON.stringify({ email, name, username, password, role, jobTitle, linkedIn, bio, website }),
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
    });

    return res.json();

};
export default function SignUp() {
    const actionData = useActionData();
    const navigation = useNavigation();
    const [selectedOption, setSelectedOption] = useState('');

    const state: "idle" | "success" | "error" | "submitting" = navigation.state === "submitting"
        ? "submitting"
        : actionData?.name === 'Error'
            ? "error"
            : "idle";
    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const inputRef = useRef<HTMLInputElement>(null);
    const successRef = useRef<HTMLHeadingElement>(null);
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
                        <span className='text-brand'> انشاء </span>
                        <span className='text-navy'> حساب .</span>
                    </div>
                    <p className='font-light max-w-xs text-center'>قم بتسجيل الدخول إلى حسابك حتى تتمكن من الاستمرار في استخدام الموقع .</p>
                </div>
                <div className='grid grid-cols-1 xl:grid-cols-2 gap-8 w-full p-4 xl:p-0 text-right'>
                    <div>
                        <label htmlFor="name"
                               className="block mb-2 text-sm font-medium">الاسم الكامل</label>
                        <input type="text"
                               id="name"
                               name="name"
                               className="block p-2.5 w-full text-sm bg-formInput rounded-md border-0"
                               placeholder="الاسم الكامل"
                               required
                               aria-describedby="error-message"
                               ref={inputRef}
                        />
                    </div>
                    <div>
                        <label htmlFor="email"
                               className="block mb-2 text-sm font-medium">بريدك الالكتروني</label>
                        <input type="text"
                               id="email"
                               name="email"
                               className="block p-2.5 w-full text-sm bg-formInput rounded-md border-0"
                               placeholder="البريد الالكتروني" required/>
                    </div>
                    <div>
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
                    <div>
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
                    <div>
                        <label htmlFor="role"
                               className="block mb-2 text-sm font-medium">اختار دور المستخدم</label>
                        <select
                            onChange={handleSelectChange}
                            value={selectedOption}
                            id="role"
                            name='role'
                            className="block p-2.5 w-full text-sm bg-formInput rounded-md border-0"
                        >
                            <option selected value="Student">طالب</option>
                            <option value="Instructor">مدرب</option>
                            <option value="Company">شركة</option>
                        </select>
                    </div>

                    {selectedOption === "Instructor" && <>
                        <div className='fadeIn'>
                            <label htmlFor="jobTitle"
                                   className="block mb-2 text-sm font-medium">العنوان الوظيفي</label>
                            <input type="text"
                                   id="jobTitle"
                                   name="jobTitle"
                                   className="block p-2.5 w-full text-sm bg-formInput rounded-md border-0"
                                   placeholder="العنوان الوظيفي" required/>
                        </div>
                        <div className='fadeIn'>
                            <label htmlFor="linkedIn"
                                   className="block mb-2 text-sm font-medium">رابط اللنكدان</label>
                            <input
                                type="text"
                                id="linkedIn"
                                className="block p-2.5 w-full text-sm bg-formInput rounded-md border-0"
                                placeholder="رابط اللنكدان"
                                required
                                name="linkedIn"
                            />
                        </div>
                        <div className='fadeIn'>
                            <label htmlFor="website"
                                   className="block mb-2 text-sm font-medium">رابط الموقع الشخصي</label>
                            <input
                                type="text"
                                id="website"
                                className="block p-2.5 w-full text-sm bg-formInput rounded-md border-0"
                                placeholder="رابط الموقع الشخصي"
                                required
                                name="website"
                            />
                        </div>
                        <div className='fadeIn xl:col-span-2'>
                            <label htmlFor="bio"
                                   className="block mb-2 text-sm font-medium">السيرة الذاتية</label>
                            <textarea id="bio"
                                      name="bio"
                                      className="block p-2.5 w-full h-32 text-sm bg-formInput rounded-md border-0"
                                      placeholder="اخبرنا عنك..."></textarea>
                        </div>
                    </>}

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
                            ? "يتم انشاء الحساب..."
                            : "انشاء الحساب"}
                    </button>
                </div>
            </Form>
        </div>
    );
}
