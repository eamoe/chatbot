import {useState} from "react";
import WordListHeader from "./WordListHeader";
import SearchBar from "./SearchBar";
import WordList from "./WordList";

const FilterableWordList = ({words}) => {
    const [filterText, setFilterText] = useState('');
    return (
        <div>
            <WordListHeader/>
            <SearchBar
                filterText={filterText}
                onFilterTextChange={setFilterText} />
            <WordList words={words}
                      filterText={filterText} />
    </div>
  );
}

export default FilterableWordList
