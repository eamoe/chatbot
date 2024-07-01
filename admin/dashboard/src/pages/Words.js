import AppLayout from "../components/AppLayout";
import FilterableWordList from "../components/word-list/FilterableWordList";
import {useState, useEffect} from "react";

let BASE_URL = "http://10.211.55.11:8475/words/"

const Words = () => {

    const [words, setWords] = useState([])
    const [filterText, setFilterText] = useState('');
    const [page, setPage] = useState(1);

    const handleChangeFilter = (ev) => {
        setWords([])
        setFilterText(ev.target.value)
    }

    const handleChangePage = (ev) => {
        setWords([])
        setPage(ev.target.value)
    }

    useEffect(()=> {
        fetch(`${BASE_URL}?page=${page}`)
            .then(response=>response.json())
            .then(json=> {
                setWords(json)
            })

      },[filterText, page])

    return (
        <AppLayout>
            <FilterableWordList words={words} />
        </AppLayout>
    );
};
export default Words
