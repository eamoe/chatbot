import {useState} from "react";
import WordListHeader from "./WordListHeader";
import WordList from "./WordList";

const FilterableWordList = ({words}) => {
    const [filterText, setFilterText] = useState('');
    return (
        <div>
            <WordListHeader/>
            <WordList words={words}
                      filterText={filterText} />
    </div>
  );
}

export default FilterableWordList
