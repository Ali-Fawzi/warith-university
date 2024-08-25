import Vector from '../../asstes/icons/Vector.svg'
import { useNavigate } from '@remix-run/react';

const Pagination = ({ children, itemsPerPage, itemsStyle, currentPage, totalItems }) => {
    const navigate = useNavigate();
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'instant',
        });
    };
    const handlePageClick = (page) => {
        const skip = (page - 1) * itemsPerPage;
        navigate(`?skip=${skip}&take=${itemsPerPage}`);
        scrollToTop();
    };

    const getPaginationRange = () => {
        if (totalPages <= 5) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        const range = [];
        const leftSiblingIndex = Math.max(currentPage - 1, 2);
        const rightSiblingIndex = Math.min(currentPage + 1, totalPages - 1);

        const showLeftEllipsis = leftSiblingIndex > 2;
        const showRightEllipsis = rightSiblingIndex < totalPages - 1;

        range.push(1);

        if (showLeftEllipsis) {
            range.push('...');
        }

        for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
            range.push(i);
        }

        if (showRightEllipsis) {
            range.push('...');
        }

        range.push(totalPages);

        return range;
    };

    const paginationRange = getPaginationRange();

    return (
        <div>
            <div className={itemsStyle}>
                {children}
            </div>
            <div className="max-w-xs mx-auto flex flex-row items-center justify-center gap-8 mt-4">
                <button
                    className={currentPage === 1 ? 'opacity-50' : ''}
                    onClick={() => handlePageClick(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    <Vector/>
                </button>
                <div className='flex flex-row items-center justify-center gap-4'>
                    {paginationRange.map((page, index) => (
                        <button
                            key={index}
                            onClick={() => typeof page === 'number' ? handlePageClick(page) : null}
                            disabled={page === currentPage || page === '...'}
                            className={page === currentPage ? 'text-white bg-dark px-3 py-1' : ''}
                        >
                            {page}
                        </button>
                    ))}
                </div>
                <button
                    onClick={() => handlePageClick(currentPage + 1)}
                    className={currentPage === totalPages ? 'opacity-50' : ''}
                    disabled={currentPage === totalPages}
                >
                    <Vector className='rotate-180'/>
                </button>
            </div>
        </div>
    );
};

export default Pagination;
