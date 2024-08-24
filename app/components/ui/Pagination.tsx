import React, { useState, Children, cloneElement } from 'react';
import Vector from '../../asstes/icons/Vector.svg'

const Pagination = ({ children, itemsPerPage }) => {
    const [currentPage, setCurrentPage] = useState(1);

    const totalItems = Children.count(children);
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'instant', // Smooth scroll effect
        });
    };
    const handlePrevClick = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            scrollToTop();
        }
    };

    const handleNextClick = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
            scrollToTop();
        }
    };

    const handlePageClick = (page) => {
        setCurrentPage(page);
        scrollToTop();
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = Children.toArray(children).slice(startIndex, startIndex + itemsPerPage);

    const getPaginationRange = () => {
        const start = Math.max(1, currentPage - 2);
        const end = Math.min(totalPages, start + 4);

        return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    };

    const paginationRange = getPaginationRange();

    return (
        <div>
            <div className="flex flex-col items-center justify-center gap-16">
                {currentItems.map((child, index) => cloneElement(child, { key: index }))}
            </div>
            <div className="max-w-xs mx-auto flex flex-row items-center justify-center gap-8 mt-4">
                <button
                    className={currentPage === 1 ? 'opacity-50' : ''}
                    onClick={handlePrevClick} disabled={currentPage === 1}
                >
                    <Vector />
                </button>
                <div className='flex flex-row items-center justify-center gap-4'>
                    {paginationRange.map((page) => (
                        <button
                            key={page}
                            onClick={() => handlePageClick(page)}
                            disabled={page === currentPage}
                            className={page === currentPage ? 'text-white bg-dark px-3 py-1' : ''}
                        >
                            {page}
                        </button>
                    ))}
                </div>
                <button
                    onClick={handleNextClick}
                    className={currentPage === totalPages ? 'opacity-50' : ''}
                    disabled={currentPage === totalPages}
                >
                    <Vector className='rotate-180' />
                </button>
            </div>
        </div>
    );
};

export default Pagination;
