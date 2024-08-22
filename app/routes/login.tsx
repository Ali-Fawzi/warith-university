import {MetaFunction} from "@remix-run/node";

export const meta: MetaFunction = () => {
    return [
        { title: "جامعة وارث الانبياء" },
        { name: "الوصف", content: "اهلا بكم في جامعة وارث الانبياء في كربلاء المقدسة" },
    ];
};

export default function Login() {
    return (
        <>
            <section className='relative isolate overflow-hidden'>
                login
            </section>
        </>
    );
}
