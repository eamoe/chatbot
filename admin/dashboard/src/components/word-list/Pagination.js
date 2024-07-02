import React from 'react';

const Pagination = ({ page, totalPages, onPageChange }) => {
    const pageRange = (current, total, delta = 2) => {
        const range = [];
        for (let i = Math.max(2, current - delta); i <= Math.min(total - 1, current + delta); i++) {
            range.push(i);
        }
        if (current - delta > 2) range.unshift("...");
        if (current + delta < total - 1) range.push("...");
        range.unshift(1);
        if (total > 1) range.push(total);
        return range;
    };

    const pages = pageRange(page, totalPages);

    return (
        <nav>
            <ul className="pagination justify-content-center">
                <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => onPageChange(page - 1)}>
                        Previous
                    </button>
                </li>
                {pages.map((num, idx) => (
                    <li key={idx}
                        className={`page-item ${num === page ? 'active' : ''} ${num === "..." ? 'disabled' : ''}`}>
                        {num === "..." ? (
                            <span className="page-link">...</span>
                        ) : (
                            <button className="page-link" onClick={() => onPageChange(num)}>
                                {num}
                            </button>
                        )}
                    </li>
                ))}
                <li className={`page-item ${page === totalPages ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => onPageChange(page + 1)}>
                        Next
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;
