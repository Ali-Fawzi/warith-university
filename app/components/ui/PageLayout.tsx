import {ReactNode, SVGProps} from "react";
import {Link, NavLink} from "@remix-run/react";
import {Drawer, useDrawer} from "~/components/ui/Drawer";
import MenuIcon from "../../asstes/icons/Menu.svg"
import Logo from "../../asstes/icons/Logo.svg"
import Logo2 from "../../asstes/images/Logo2.png"
import LogoPng from "../../asstes/images/Logo.png"
import {Button} from "~/components/ui/Button";
import {JSX} from "react/jsx-runtime";

type MenuItem = {
    title: string;
    link: string;
};
const headerMenu: MenuItem[] = [
    {
        title: "الرئيسية",
        link: "/"
    },
    {
        title: "من نحن",
        link: "/about"
    },
    {
        title: "الدورات التدريبية",
        link: "/workshops"
    },
    {
        title: "الورش",
        link: "/courses"
    },
    {
        title: "الاخبار",
        link: "/news"
    },
    {
        title: "تواصل معنا",
        link: "/contact-us"
    }
]
const footerNavigation = {
    website: [
        {name: 'الرئيسية', href: '#'},
        {name: 'عن المركز', href: '#'},
        {name: 'النشاطات', href: '#'},
        {name: 'الفيديوهات', href: '#'},
    ],
    university: [
        {name: 'موقع الجامعة', href: '#'},
        {name: 'التجول الافتراضي VR', href: '#'},
        {name: 'نافذة الطالب الالكترونية', href: '#'},
        {name: 'التعليم المستمر', href: '#'},
    ],
    social: [
        {
            name: 'فيسبوك',
            href: '#',
            icon: (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
                <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
                    <path
                        fillRule="evenodd"
                        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                        clipRule="evenodd"
                    />
                </svg>
            ),
        },
        {
            name: 'انستاغرام',
            href: '#',
            icon: (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
                <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
                    <path
                        fillRule="evenodd"
                        d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                        clipRule="evenodd"
                    />
                </svg>
            ),
        },
        {
            name: 'يوتيوب',
            href: '#',
            icon: (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
                <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
                    <path
                        fillRule="evenodd"
                        d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
                        clipRule="evenodd"
                    />
                </svg>
            ),
        },
        {
            name: 'اكس',
            href: '#',
            icon: (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
                <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
                    <path d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z" />
                </svg>
            ),
        },
    ],
}
export function PageLayout({children}: {children: ReactNode}) {
    return (
        <>
            <div className="flex flex-col min-h-screen bg-background font-almarai font-normal">
                <div>
                    <a href="#mainContent" className="sr-only">
                        Skip to content
                    </a>
                </div>
                <div className='bg-dark p-2 text-left text-white'>الموقع الرسمي للجامعة</div>
                <Header>
                    <Link to={'/'} prefetch={'intent'}>
                        <div className='flex flex-row items-center justify-center space-x-4'>
                            <div className='flex flex-col items-end justify-center text-sm xl:text-base text-right'>
                                <p className='py-2 border-brand border-b w-full text-right'>جامعة وارث الانبياء</p>
                                <p className='font-bold'>مركز وارث</p>
                                <p>للريادة و الابتكار و التطوير</p>
                            </div>
                            <div>
                                <Logo className="h-[31.5px] w-[58.8px] xl:h-[66.717px] xl:w-[123.9px]"/>
                            </div>
                        </div>
                    </Link>
                </Header>
                <main role="main" id="mainContent" className="grow">
                    {children}
                </main>
            </div>
            <Footer>
                <div className='flex flex-col items-center justify-center space-y-4 text-white'>
                    <div>
                        <img alt='' className="h-[63.7px] w-[118.3px]" src={LogoPng}/>
                    </div>
                    <div className='flex flex-col items-center justify-center text-3xl'>
                        <p className='border-brand border-b pb-4 font-light text-right'>مركز وارث للريادة والابتكار والتطوير</p>
                        <p className='font-bold'>
                            <span>اطلق </span>
                            <span className='text-brand'>قدراتك </span>
                            <span>وابتكر </span>
                            <span className='text-brand'>مستقبلك</span>
                        </p>
                    </div>
                </div>
            </Footer>
        </>
    )
}

function MenuDrawer({
    isOpen,
    onClose,
}: {
    isOpen: boolean;
    onClose: () => void;
}) {
    return (
        <Drawer open={isOpen} onClose={onClose} openFrom="right">
            <div className='px-6 flex flex-col items-end justify-start'>
                <div className={'pl-6 w-full'}>
                    {headerMenu.map((menuItem) =>
                            <nav
                                className='w-full border-brand border-b text-right py-4 last:border-none'
                                key={menuItem.title}
                            >
                                <NavLink
                                    prefetch={'intent'}
                                to={menuItem.link}
                                className={({isActive}) => isActive ?
                                    "font-semibold" : ""
                                }>
                                {menuItem.title}
                            </NavLink>
                        </nav>
                        )}
                </div>
            </div>
        </Drawer>
    );
}

function Header({children}: { children: ReactNode }) {
    const {
        isOpen: isMenuOpen,
        openDrawer: openMenu,
        closeDrawer: closeMenu,
    } = useDrawer();

    return (
        <>
            <MenuDrawer isOpen={isMenuOpen} onClose={closeMenu}/>
            <header
                role="banner"
                className='flex flex-row items-center justify-between space-x-8 mb-4 mx-4 xl:mx-16'
            >
                <div className='xl:hidden'>
                    <button
                        onClick={openMenu}
                        className="relative flex items-center justify-center w-8 h-8"
                        aria-label={'hamburger menu'}
                    >
                        <MenuIcon className="h-6 w-6"/>
                    </button>
                </div>
                <div className='hidden xl:flex flex-row space-x-4'>
                    <Link to={'/register'}>
                        <Button variant={'secondary'}>التسجيل</Button>
                    </Link>
                    <Link to={'/login'}>
                        <Button>تسجيل الدخول</Button>
                    </Link>
                </div>
                <div className='grow flex flex-row items-center justify-end space-x-8'>
                    <div className='hidden xl:flex flex-row items-end justify-between space-x-4'>
                        {headerMenu.map((menuItem) =>
                            <nav key={menuItem.title} className='border-brand border-l first:border-none px-2 hover:text-black/70 ease-in-out transform transition duration-500'>
                                <NavLink
                                    prefetch={'intent'}
                                    to={menuItem.link}
                                    className={({isActive}) => isActive ?
                                        "font-semibold" : ""
                                    }>
                                    {menuItem.title}
                                </NavLink>
                            </nav>
                        ).reverse()}
                    </div>
                    <div>{children}</div>
                </div>
            </header>
        </>
    )
}

function Footer({children}: { children: ReactNode }) {
    return (
        <footer aria-labelledby="footer-heading" className="bg-dark font-almarai">
            <h2 id="footer-heading" className="sr-only">
                Footer
            </h2>
            <div className="pb-8 pt-12">
                <div className="grid grid-cols-1 xl:grid-cols-6 gap-8 mx-4 xl:mx-16">
                    <div className='xl:col-start-6 row-start-1 flex items-center justify-center xl:justify-end'>
                        <img alt='' className="h-[126px] w-[81.9px] xl:h-[180px] xl:w-[117px]" src={Logo2}/>
                    </div>
                    <div className='flex xl:col-start-2 flex-col items-center justify-center space-y-2 text-white text-center xl:text-right'>
                        <p className='text-xl w-full'>روابط الموقع</p>
                        {footerNavigation.website.map((item) => (
                            <Link
                                key={item.name}
                                to={item.href}
                                className='font-light w-full'
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                    <div className='hidden xl:block col-span-2'>
                        {children}
                    </div>
                    <div className='flex flex-col items-center justify-center space-y-2 text-white text-center xl:text-right'>
                        <p className='text-xl w-full'>روابط الجامعة</p>
                        {footerNavigation.university.map((item) => (
                            <Link
                                key={item.name}
                                to={item.href}
                                className='font-light w-full'
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                    <div className='xl:hidden'>
                        {children}
                    </div>
                </div>
                <div className="mt-16 border-t border-brand p-2">
                    <div
                        className='mx-4 xl:mx-16 flex flex-col items-center justify-center space-y-4 xl:flex-row-reverse xl:justify-between'>
                        <p className="leading-5 text-white md:order-1 md:mt-0 text-right">
                            العنوان: العراق - كربلاء المقدسة / طريق بغداد - كربلاء (عمود 119)
                        </p>
                        <div className="flex space-x-6 md:order-2">
                            {footerNavigation.social.map((item) => (
                                <Link to={item.href} key={item.name}
                                      className='p-1 rounded-full bg-white hover:bg-dark ease-in-out transform transition duration-500'>
                                    <div
                                        className="text-dark hover:text-white ease-in-out transform transition duration-500">
                                        <span className="sr-only">{item.name}</span>
                                        <item.icon aria-hidden="true" className="h-6 w-6"/>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}