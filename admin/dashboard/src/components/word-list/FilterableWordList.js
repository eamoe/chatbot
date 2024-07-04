import {useState} from "react";
import WordList from "./WordList";
import {Container} from "react-bootstrap";

const FilterableWordList = ({ words }) => {

    const [filterText, setFilterText] = useState('');

    return (
        <Container>
            <WordList words={ words } filterText={ filterText } />
        </Container>
  );
}

export default FilterableWordList
