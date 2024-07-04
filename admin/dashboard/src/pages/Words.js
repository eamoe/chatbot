import AppLayout from "../components/AppLayout";
import SearchBar from "../components/word-list/SearchBar";
import FilterableWordList from "../components/word-list/FilterableWordList";
import Pagination from "../components/word-list/Pagination";
import {useState, useEffect} from "react";
import {adminConfig} from "../config";
import {Container, Row, Col} from "react-bootstrap";

const REACT_APP_BASE_URL = adminConfig.REACT_APP_BASE_URL;
const Words = () => {

    const [words, setWords] = useState([]);
    const [filterText, setFilterText] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchWords();
    }, [filterText, page]);

    const fetchWords = async () => {
        const response = await fetch(`${REACT_APP_BASE_URL}/words/?word_name=${filterText}&page=${page}`);
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
            <Container>
                <Row className="mt-5">
                    <Col>
                        <Pagination page={page} totalPages={totalPages} onPageChange={handlePageChange} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <SearchBar filterText={filterText} onFilterTextChange={handleFilterTextChange} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FilterableWordList words={words} />
                    </Col>
                </Row>
                <Row className="my-4">
                    <Col>
                        <Pagination page={page} totalPages={totalPages} onPageChange={handlePageChange} />
                    </Col>
                </Row>
            </Container>
        </AppLayout>
    );
};
export default Words
