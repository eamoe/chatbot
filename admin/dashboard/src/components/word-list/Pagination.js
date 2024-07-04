import { Pagination as BootstrapPagination} from 'react-bootstrap';

const Pagination = ({ page, totalPages, onPageChange }) => {
    const pageRange = (current, total, delta = 2) => {
        const range = [];
        for (let i = Math.max(2, current - delta);
             i <= Math.min(total - 1, current + delta);
             i++) {
            range.push(i);
        }
        if (current - delta > 2) range.unshift("...");
        if (current + delta < total - 1) range.push("...");
        range.unshift(1);
        if (total > 1) range.push(total);
        return range;
    };

    const pages = pageRange(page, totalPages);

    const handlePageChange = (num) => {
        if (num !== '...') {
            onPageChange(num);
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        }
    };

    const renderPageItem = (num, idx) => {
        if (num === '...') {
            return <BootstrapPagination.Ellipsis key={idx} disabled />;
        }

        return (
            <BootstrapPagination.Item
                key={ idx }
                active={ num === page }
                onClick={ () => onPageChange(num) }
            >
                { num }
            </BootstrapPagination.Item>
        );
    };

    return (
        <BootstrapPagination className="justify-content-center">
            <BootstrapPagination.Prev
                onClick={ () => onPageChange(page - 1) }
                disabled={ page === 1 }
            />
            { pages.map(renderPageItem) }
            <BootstrapPagination.Next
                onClick={ () => onPageChange(page + 1) }
                disabled={ page === totalPages }
            />
        </BootstrapPagination>
    );
};

export default Pagination;
