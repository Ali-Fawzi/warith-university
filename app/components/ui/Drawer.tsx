import React, {useState} from 'react';
import {
    Dialog,
    DialogPanel,
    DialogBackdrop,
} from '@headlessui/react';
import CloseIcon from "../../asstes/icons/Close.svg"
/**
 * Drawer component that opens on user click.
 * @param heading - string. Shown at the top of the drawer.
 * @param open - boolean state. if true opens the drawer.
 * @param onClose - function should set the open state.
 * @param openFrom - right, left
 * @param children - react children node.
 */
export function Drawer({
   heading,
   open,
   onClose,
   openFrom = 'right',
   children,
}: {
    heading?: string;
    open: boolean;
    onClose: () => void;
    openFrom: 'right' | 'left';
    children: React.ReactNode;
}) {
    return (
        <Dialog open={open} as="div" className="relative z-50" onClose={onClose}>
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-dark/50 transition-opacity ease-in-out transform duration-500 data-[closed]:opacity-0"
            />

            <div className="fixed inset-0">
                <div className="absolute inset-0 overflow-hidden">
                    <div
                        className={`fixed inset-y-0 flex max-w-full ${
                            openFrom === 'right' ? 'right-0' : ''
                        }`}
                    >
                        <DialogPanel
                            transition
                            className={`w-screen max-w-xs overflow-y-auto lg:overflow-hidden text-left align-middle shadow-xl h-screen-dynamic bg-background pointer-events-auto ease-in-out transform transition duration-500 ${
                                openFrom === 'right'
                                    ? 'data-[closed]:translate-x-full'
                                    : 'data-[closed]:-translate-x-full'
                            }`}
                        >
                            <header
                                className={`top-0 flex my-8 items-center px-6 md:px-8 ${
                                    heading ? 'justify-between' : 'justify-start'
                                }`}
                            >
                                <div className="flex">
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="inline-flex items-center justify-center rounded-md"
                                        data-test="close-cart"
                                    >
                                        <span className="sr-only">Close menu</span>
                                        <CloseIcon
                                            className="h-5 w-5"
                                            aria-label="Close panel"
                                        />{' '}
                                    </button>
                                </div>
                            </header>
                            <div className="overflow-y-scroll lg:overflow-hidden">
                                {children}
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </div>
        </Dialog>
    );
}

/* Use for associating arialabelledby with the title*/
Drawer.Title = Dialog.Title;

export function useDrawer(openDefault = false) {
    const [isOpen, setIsOpen] = useState(openDefault);

    function openDrawer() {
        setIsOpen(true);
    }

    function closeDrawer() {
        setIsOpen(false);
    }

    return {
        isOpen,
        openDrawer,
        closeDrawer,
    };
}
