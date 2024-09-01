import {ActionFunction, MetaFunction, redirect} from "@remix-run/node";
import {Form, useActionData, useNavigation} from "@remix-run/react";
import {useEffect, useRef, useState} from "react";
import {jwtCookie, roleCookie} from "~/lib/cookies";

export const meta: MetaFunction = () => {
    return [
        {title: "جامعة وارث الانبياء"},
        {name: "الوصف", content: "اهلا بكم في جامعة وارث الانبياء في كربلاء المقدسة"},
    ];
};
export const action: ActionFunction = async ({request}) => {
    await new Promise((res) => setTimeout(res, 1000));
    const formData = await request.formData();
    const name = formData.get("name");
    const pic = formData.get("pic");
    const username = formData.get("username");
    const password = formData.get("password");
    const userRole = formData.get("role");
    const jobTitle = formData.get("jobTitle");
    const linkedIn = formData.get("linkedIn");
    const website = formData.get("website");
    const bio = formData.get("bio");
    const email = formData.get("email");

    const apiFormData = new FormData();
    apiFormData.append("name", name as string);
    apiFormData.append("username", username as string);
    apiFormData.append("password", password as string);
    apiFormData.append("role", userRole as string);
    apiFormData.append("email", email as string);

    if (userRole === "Instructor") {
        apiFormData.append("jobTitle", jobTitle as string);
        apiFormData.append("linkedIn", linkedIn as string);
        apiFormData.append("website", website as string);
        apiFormData.append("bio", bio as string);
    } else {
        apiFormData.append("jobTitle", '.');
        apiFormData.append("linkedIn", '.');
        apiFormData.append("website", '.');
        apiFormData.append("bio", '.');
    }
    if (pic && pic instanceof File) {
        apiFormData.append("pic", pic);
    }
    const res = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/users/sign-up`, {
        method: "POST",
        body: apiFormData,
    });

    if (!res.ok) {
        return 'Error';
    }
    const response = await res.json();
    const {token, user} = response;
    const {role} = user;

    return redirect("/", {
        headers: [
            ["Set-Cookie", await jwtCookie.serialize(token)],
            ["Set-Cookie", await roleCookie.serialize(role)],
        ],
    });
};
export default function SignUp() {
    const actionData = useActionData();
    const navigation = useNavigation();
    const [selectedOption, setSelectedOption] = useState('');
    const state: "idle" | "success" | "error" | "submitting" = navigation.state === "submitting"
        ? "submitting"
        : actionData === 'Error'
            ? "error"
            : "idle";
    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
    };

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
                        <span className='text-brand'> انشاء </span>
                        <span className='text-navy'> حساب .</span>
                    </div>
                    <p className='font-light max-w-xs text-center'>قم بانشاء حساب حتى تتمكن من الاستمرار في استخدام الموقع .</p>
                </div>
                <div className='grid grid-cols-1 xl:grid-cols-2 gap-8 w-full p-4 xl:p-0 text-right max-w-lg xl:max-w-full'>
                    <div>
                        <label htmlFor="role"
                               className="block mb-2 text-sm font-medium">اختر دور المستخدم</label>
                        <select
                            onChange={handleSelectChange}
                            value={selectedOption}
                            id="role"
                            name='role'
                            className="block p-2.5 w-full text-sm bg-formInput rounded-md border-0"
                        >
                            <option disabled selected value=''>اختر دور المستخدم</option>
                            <option value="Student">طالب</option>
                            <option value="Instructor">مدرب</option>
                            <option value="Company">شركة</option>
                        </select>
                    </div>
                    {selectedOption === 'Company' && (
                    <div className='fadeIn'>
                        <label htmlFor="name"
                               className="block mb-2 text-sm font-medium">اسم الشركة</label>
                        <input type="text"
                               id="name"
                               name="name"
                               className="block p-2.5 w-full text-sm bg-formInput rounded-md border-0"
                               placeholder="اسم الشركة"
                               required
                               aria-describedby="error-message"
                               ref={inputRef}
                        />
                    </div>)}
                    {(selectedOption === "Instructor" || selectedOption === "Student") && (
                        <div className='fadeIn'>
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
                        </div>)}
                    {selectedOption && (
                        <>
                            <div className='fadeIn'>
                                <label htmlFor="email"
                                       className="block mb-2 text-sm font-medium">بريدك الالكتروني</label>
                                <input type="text"
                                       id="email"
                                       name="email"
                                       className="block p-2.5 w-full text-sm bg-formInput rounded-md border-0"
                                       placeholder="البريد الالكتروني" required/>
                            </div>
                            <div className='fadeIn'>
                                <label htmlFor="username"
                                       className="block mb-2 text-sm font-medium">رقم الهاتف</label>
                                <input
                                    type="text"
                                    id="username"
                                    className="block p-2.5 w-full text-sm bg-formInput rounded-md border-0"
                                    placeholder="رقم الهاتف"
                                    required
                                    name="username"
                                />
                            </div>
                            <div className='fadeIn'>
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
                            <div className='fadeIn'>
                                <label htmlFor="pic"
                                       className="block mb-2 text-sm font-medium">صورة الحساب</label>
                                <input type="file" id="cover"
                                       name="pic"
                                       className="block w-full bg-formInput rounded-md border-0 shadow-sm text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none
                                file:bg-formInput file:border-0
                                file:me-4
                                file:py-3 file:px-4"
                                       placeholder="صورة الحساب"
                                       required/>
                            </div>
                        </>
                    )}
                    {(selectedOption === "Instructor" || selectedOption === "Company") && <>
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
                        <div className='fadeIn'>
                            <label htmlFor="bio"
                                   className="block mb-2 text-sm font-medium">السيرة الذاتية</label>
                            <textarea id="bio"
                                      name="bio"
                                      className="block p-2.5 w-full h-10 text-sm bg-formInput rounded-md border-0"
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
                        disabled={selectedOption === ''}
                        type='submit'
                        className='inline-block rounded-md font-semibold text-center py-3 px-6 bg-navy text-white hover:bg-navy/90 ease-in-out transform transition duration-500 select-none'>
                        {state === "submitting"
                            ? "يتم انشاء الحساب..."
                            : selectedOption ?  "انشاء الحساب" : "اختر دور المستخدم"}
                    </button>
                </div>
            </Form>
        </div>
    );
}
