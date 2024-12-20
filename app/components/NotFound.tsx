import {Link} from "@remix-run/react";

export function NotFound() {
    return (
        <main dir="RTL" className="mx-auto flex w-full max-w-7xl flex-auto flex-col justify-center px-6 py-24 sm:py-64 lg:px-8 font-almarai">
            <p className="text-base font-semibold leading-8 text-navy">404</p>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">الصفحة غير متوفرة</h1>
            <p className="mt-6 text-base leading-7 text-gray-600">تعذر الوصول الى الصفحة المطلوبة</p>
            <div className="mt-10">
                <Link to={'/'} className="text-sm font-semibold leading-7 text-navy">
                    العودة الى الصفحة الرئيسية <span aria-hidden="true">&larr;</span>
                </Link>
            </div>
        </main>
    );
}