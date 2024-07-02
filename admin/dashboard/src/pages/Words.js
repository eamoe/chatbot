import AppLayout from "../components/AppLayout";
import SearchBar from "../components/word-list/SearchBar";
import FilterableWordList from "../components/word-list/FilterableWordList";
import Pagination from "../components/word-list/Pagination";
import {useState, useEffect} from "react";

const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;
console.log("LOOK AT ME:" + REACT_APP_BASE_URL)
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
