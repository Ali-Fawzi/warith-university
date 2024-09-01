import {ActionFunction, MetaFunction, redirect} from "@remix-run/node";
import {HeroSection} from "~/components/HeroSection";
import {Form, useActionData, useNavigation} from "@remix-run/react";
import {useEffect, useRef} from "react";
import {jwtCookie, roleCookie} from "~/lib/cookies";
export const meta: MetaFunction = () => {
    return [
        { title: "جامعة وارث الانبياء" },
        { name: "الوصف", content: "اهلا بكم في جامعة وارث الانبياء في كربلاء المقدسة" },
    ];
};
export const action: ActionFunction = async ({ request }) => {
    await new Promise((res) => setTimeout(res, 1000));

    const formData = await request.formData();
    const title = formData.get("title");
    const content = formData.get("content");
    const numberLectures = formData.get("numberLectures");
    const place = formData.get("place");
    const startDate = formData.get("startDate");
    const description = formData.get("description");
    const type = formData.get("type");
    const status = formData.get("status");
    const lectures =  formData.get("lectures");
    const duration = formData.get("duration");
    const hasCertificate = formData.get("hasCertificate");
    const cover = formData.get("cover");

    const token = await jwtCookie.parse(request.headers.get("Cookie"));

    if (!token) {
        return redirect("/login");
    }

    const apiFormData = new FormData();
    apiFormData.append("title", title as string);
    apiFormData.append("content", content as string);
    apiFormData.append("numberLectures", numberLectures as string);
    apiFormData.append("place", place as string);
    apiFormData.append("startDate", startDate as string);
    apiFormData.append("description", description as string);
    apiFormData.append("type", type as string);
    apiFormData.append("status", status as string);
    apiFormData.append("lectures", JSON.stringify(lectures.split("\n")));
    apiFormData.append("duration", duration as string);
    apiFormData.append("hasCertificate", hasCertificate as string);
    if (cover && cover instanceof File) {
        apiFormData.append("cover", cover);
    }

    const res = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/courses`, {
        method: "POST",
        body: apiFormData,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (!res.ok) {
        return 'Error';
    }
    const link = type === 'Warsha' ? 'workshops' : 'courses';
    const response = await res.json();
    const { id:courseId } = response;
    return redirect(`/${link}/${courseId}`);
};
export async function loader({ request }) {
    const role = await roleCookie.parse(request.headers.get("Cookie"));

    if(role && role === 'Instructor' || role === 'Company') {
        return null;
    }
    return redirect('/');
}
export default function CourseCreate() {
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
            <section className='relative isolate overflow-hidden'>
                <HeroSection title={'انشاء دورة'}/>
            </section>
            <Form
                replace
                dir='RTL'
                method="POST"
                className='mt-8 max-w-6xl py-8 mx-auto flex flex-col items-center justify-center gap-16'
                encType="multipart/form-data"
            >
                <div className='flex flex-col items-center justify-center space-y-2'>
                    <p className='text-xl'>استمارة انشاء دورة</p>
                    <p className='font-light max-w-xs text-center'>يرجى التاكد من صحة المعلومات قبل انشاء الدورة</p>
                </div>
                <div className='grid grid-cols-1 xl:grid-cols-2 gap-8 w-full p-4 xl:p-0 text-right max-w-lg xl:max-w-full'>
                    <div>
                        <label htmlFor="title"
                               className="block mb-2 text-sm font-medium">العنوان</label>
                        <input type="text"
                               id="title"
                               name="title"
                               className="block p-2.5 w-full text-sm bg-formInput rounded-md border-0"
                               placeholder="ادخل العنوان"
                               required
                               aria-describedby="error-message"
                               ref={inputRef}
                        />
                    </div>
                    <div>
                        <label htmlFor="content"
                               className="block mb-2 text-sm font-medium">المحتوى</label>
                        <input type="text"
                               id="content"
                               name="content"
                               className="block p-2.5 w-full text-sm bg-formInput rounded-md border-0"
                               placeholder="ادخل المحتوى" required/>
                    </div>
                    <div>
                        <label htmlFor="numberLectures"
                               className="block mb-2 text-sm font-medium">عدد المحاضرات</label>
                        <input
                            type="number"
                            id="numberLectures"
                            className="block p-2.5 w-full text-sm bg-formInput rounded-md border-0"
                            placeholder="عدد المحاضرات"
                            required
                            name="numberLectures"
                        />
                    </div>
                    <div>
                        <label htmlFor="cover"
                               className="block mb-2 text-sm font-medium">الغلاف</label>
                        <input type="file" id="cover"
                               name="cover"
                               className="block w-full bg-formInput rounded-md border-0 shadow-sm text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none
                                file:bg-formInput file:border-0
                                file:me-4
                                file:py-3 file:px-4"
                               placeholder="الغلاف" required/>
                    </div>
                    <div>
                        <label htmlFor="place"
                               className="block mb-2 text-sm font-medium">الموقع</label>
                        <input
                            type="text"
                            id="place"
                            className="block p-2.5 w-full text-sm bg-formInput rounded-md border-0"
                            placeholder="الموقع"
                            required
                            name="place"
                        />
                    </div>
                    <div>
                        <label htmlFor="startDate"
                               className="block mb-2 text-sm font-medium">وقت بداء الدورة</label>
                        <input
                            type="date"
                            id="startDate"
                            className="block p-2.5 w-full text-sm bg-formInput rounded-md border-0"
                            placeholder="وقت بداء الدورة"
                            required
                            name="startDate"
                        />
                    </div>
                    <div>
                        <label htmlFor="duration"
                               className="block mb-2 text-sm font-medium">المدة</label>
                        <input
                            type="text"
                            id="duration"
                            className="block p-2.5 w-full text-sm bg-formInput rounded-md border-0"
                            placeholder="المدة"
                            required
                            name="duration"
                        />
                    </div>
                    <div>
                        <label htmlFor="type"
                               className="block mb-2 text-sm font-medium">اختار نوع الدورة</label>
                        <select
                            id="type"
                            name='type'
                            className="block p-2.5 w-full text-sm bg-formInput rounded-md border-0"
                        >
                            <option value="Warsha">ورشة</option>
                            <option value="Tadreab">تدريب</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="status"
                               className="block mb-2 text-sm font-medium">حالة الدورة</label>
                        <select
                            id="status"
                            name='status'
                            className="block p-2.5 w-full text-sm bg-formInput rounded-md border-0"
                        >
                            <option value="Pending">انتظار</option>
                            <option value="Approved">قبول</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="lectures"
                               className="block mb-2 text-sm font-medium">المحاضرات</label>
                        <textarea id="lectures"
                                  name="lectures"
                                  className="block p-2.5 w-full h-10 text-sm bg-formInput rounded-md border-0"
                                  placeholder="ادخل المحاضرات..."></textarea>
                        <p className="mt-2 text-sm text-brand">ملاحظة: يرجى الضغط على  Enter  من اجل ادخال عنوان اكثر من محاضرة</p>

                    </div>
                    <div className='xl:col-span-2'>
                        <label htmlFor="description"
                               className="block mb-2 text-sm font-medium">الوصف</label>
                        <textarea id="description"
                                  name="description"
                                  className="block p-2.5 w-full h-32 text-sm bg-formInput rounded-md border-0"
                                  placeholder="ادخل الوصف..."></textarea>
                    </div>
                    <div className="flex items-center mb-4">
                        <input id="hasCertificate" type="checkbox" name='hasCertificate'
                               className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 text-sm bg-formInput rounded-md border-0"/>
                        <label htmlFor="hasCertificate"
                               className="ms-2 text-sm font-medium">شهادة متوفرة</label>
                    </div>
                </div>
                <div className='flex flex-col items-center justify-center gap-4 relative'>
                    <div className='text-rose-500 text-center' id="error-message">
                        {state === "error" ? <div>
                            <p>تعذر انشاء الدورة</p>
                            <p>يرجى التاكد من صحة المعلومات و اعادة المحاولة</p>
                        </div> : ''}
                    </div>
                    <button
                        type='submit'
                        className='inline-block rounded-md font-semibold text-center py-3 px-6 bg-brand text-white hover:bg-brand/90 ease-in-out transform transition duration-500 select-none'>
                        {state === "submitting"
                            ? "يتم انشاء الدورة ..."
                            : "انشاء الدورة"}
                    </button>
                </div>
            </Form>
        </div>
    );
}
