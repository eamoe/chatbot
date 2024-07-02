import React from 'react';

const Pagination = ({ page, totalPages, onPageChange }) => {
    const pages = [...Array(totalPages).keys()].map(num => num + 1);

    return (
        <nav>
            <ul className="pagination">
                {pages.map(num => (
                    <li key={num} className={`page-item ${num === page ? 'active' : ''}`}>
                        <button className="page-link" onClick={() => onPageChange(num)}>
                            {num}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Pagination;
