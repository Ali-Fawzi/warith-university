import {ActionFunction, MetaFunction} from "@remix-run/node";
import {HeroSection} from "~/components/HeroSection";
import LocationIcon from '../asstes/icons/Location.svg'
import PhoneCallIcon from '../asstes/icons/PhoneCall.svg'
import MailIcon from '../asstes/icons/Mail.svg'
import {Form, Link, useActionData, useNavigation} from "@remix-run/react";
import {useEffect, useRef} from "react";
import clsx from "clsx";
import {Button} from "~/components/ui/Button";
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
    const phone = formData.get("phone");
    const address = formData.get("address");
    const message = formData.get("message");
    const email = formData.get("email");

    const res = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/contact`, {
        method: "post",
        body: JSON.stringify({ email, phone, address, message, name }),
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
    });

    return res.json();

};

export default function ContactUs() {
    const actionData = useActionData();
    const navigation = useNavigation();

    const state: "idle" | "success" | "error" | "submitting" = navigation.state === "submitting"
        ? "submitting"
        : actionData?.name === 'Error'
            ? "error"
            : actionData?.status === 'Unread'
                ? "success"
                : "idle";

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

        if (state === "success") {
            successRef.current?.focus();
        }

        mounted.current = true;
    }, [state]);

    return (
        <div className='bg-white'>
            <section className='relative isolate overflow-hidden'>
                <HeroSection title={'تواصل معنا'}/>
            </section>
            <section className='flex items-center justify-center'>
                <iframe
                    title='موقع جامعة وارث الانبياء على الخريطة'
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d53753.03712179712!2d44.0109217748212!3d32.64441062186218!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15596d7a78498f9f%3A0xf8f10cf048e9ad3!2z2KzYp9mF2LnYqSDZiNin2LHYqyDYp9mE2KPZhtio2YrYp9ih!5e0!3m2!1sen!2siq!4v1724338199435!5m2!1sen!2siq"
                    loading="eager"
                    className='p-10 w-[380px] h-[201px] xl:w-[1428px] xl:h-[430px]'
                    referrerPolicy="no-referrer-when-downgrade"/>
            </section>
            <section
                className='flex flex-col-reverse items-center justify-around xl:flex-row max-w-6xl px-16 py-8 bg-dark mx-auto text-white'>
                <div
                    className='flex flex-col items-center justify-center border-white border-t xl:border-r xl:border-t-0 p-4'>
                    <LocationIcon/>
                    <p className='text-right'>العراق - كربلاء المقدسة
                        طريق بغداد</p>
                </div>
                <div className='flex flex-col items-center justify-center p-4'>
                    <PhoneCallIcon/>
                    <p>+9647800800758</p>
                </div>
                <div
                    className='flex flex-col items-center justify-center border-white border-b xl:border-l xl:border-b-0 p-4'>
                    <MailIcon/>
                    <p>Info@warithelevate.com</p>
                    <p>Support@warithelevate.com</p>
                </div>
            </section>
            <Form
                replace
                dir='RTL'
                method="POST"
                className={clsx('mt-8 max-w-6xl py-8 mx-auto flex flex-col items-center justify-center gap-16', state !== "success" ? 'block' : 'hidden')}
            >
                <div className='flex flex-col items-center justify-center space-y-2'>
                    <p className='text-xl'>اخبرنا بما تفكر برسالة</p>
                    <p className='font-light max-w-xs text-center'>يمكنك اخبارنا بما تفكر او المشاكل التي تواجها لكي
                        نتمكن من مساعدتك ومعرفة افكارك .</p>
                </div>
                <div className='grid grid-cols-1 xl:grid-cols-2 gap-8 w-full p-4 xl:p-0 text-right max-w-lg xl:max-w-full'>
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
                        <label htmlFor="phone"
                               className="block mb-2 text-sm font-medium">رقم الهاتف</label>
                        <input
                            type="text"
                            id="phone"
                            className="block p-2.5 w-full text-sm bg-formInput rounded-md border-0"
                            placeholder="رقم الهاتف"
                            required
                            name="phone"
                        />
                    </div>
                    <div>
                        <label htmlFor="address"
                               className="block mb-2 text-sm font-medium">العنوان</label>
                        <input type="text" id="address"
                               name="address"
                               className="block p-2.5 w-full text-sm bg-formInput rounded-md border-0"
                               placeholder="العنوان" required/>
                    </div>
                    <div className='xl:col-span-2'>
                        <label htmlFor="message"
                               className="block mb-2 text-sm font-medium">الرسالة</label>
                        <textarea id="message"
                                  name="message"
                                  className="block p-2.5 w-full h-32 text-sm bg-formInput rounded-md border-0"
                                  placeholder="اكتب رسالتك..."></textarea>
                    </div>
                </div>
                <div className='flex flex-col items-center justify-center gap-4 relative'>
                    <div className='text-rose-500 text-center' id="error-message">
                        {state === "error" ? <div>
                            <p>تعذر التسليم</p>
                            <p>يرجى اعادة المحاولة لاحقا</p>
                        </div> : ''}
                    </div>
                    <button
                        type='submit'
                        className='inline-block rounded-md font-semibold text-center py-3 px-6 bg-brand text-white hover:bg-brand/90 ease-in-out transform transition duration-500 select-none'>
                        {state === "submitting"
                            ? "يتم الارسال ..."
                            : "ارسال الرسالة"}
                    </button>
                </div>
            </Form>
            <div
                className={clsx(state !== "success" ? 'hidden' : 'block', 'mt-8 max-w-6xl py-8 mx-auto flex flex-col items-center justify-center gap-2')}>
                <h2 className='text-xl font-bold text-emerald-500' ref={successRef} tabIndex={-1}>
                    تم الارسال
                </h2>
                <p>سيتم الرد باقرب وقت</p>
                <Link to=".">
                    <Button baseButtonClasses='inline-block rounded-md font-semibold text-center py-3 px-6'>
                        ارسل رسالة اخرى
                    </Button>
                </Link>
            </div>
        </div>
    );
}
