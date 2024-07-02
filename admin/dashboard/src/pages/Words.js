import AppLayout from "../components/AppLayout";
import FilterableWordList from "../components/word-list/FilterableWordList";
import {useState, useEffect} from "react";
import SearchBar from "../components/word-list/SearchBar";
import Pagination from "../components/Pagination";

const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;
const Words = () => {

    const [words, setWords] = useState([])
    const [filterText, setFilterText] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchWords();
    }, [filterText, page]);

    const fetchWords = async () => {
        const response = await fetch(`${REACT_APP_BASE_URL}?word_name=${filterText}&page=${page}`);
        const data = await response.json();
        setWords(data.words);
        setTotalPages(data.totalPages);
    };

    const handleFilterTextChange = (text) => {
        setFilterText(text);
        setPage(1); // Reset to first page on new search
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    return (
        <AppLayout>
            <SearchBar filterText={filterText} onFilterTextChange={handleFilterTextChange} />
            <FilterableWordList words={words} />
            <Pagination page={page} totalPages={totalPages} onPageChange={handlePageChange} />
        </AppLayout>
    );
};
export default Words
