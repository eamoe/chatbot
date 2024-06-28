import {useState} from "react";

function Header() {
  return (
      <div id="header" className="row my-5">
          <h1 className="text-center">Tresaurus Admin Application</h1>
      </div>
  );
}

function WordFormHeader() {
    return (
        <div className="mb-3">
            <h4>Add a New Word</h4>
        </div>
    );
}

function WordForm() {
    return (
        <form method="post" action="/add_word">
            <div className="mb-3">
                <label for="name" className="form-label">Word</label>
                <input type="text" className="form-control" name="name" id="name" required/>
            </div>
            <div className="mb-3">
                <label for="partOfSpeech" className="form-label">Part of Speech</label>
                <select className="form-select" name="partOfSpeech" id="partOfSpeech" aria-label="Parts of speech">
                    <option selected>Noun</option>
                    <option value="1">Pronoun</option>
                    <option value="2">Verb</option>
                    <option value="3">Adjective</option>
                    <option value="4">Adverb</option>
                    <option value="5">Preposition</option>
                    <option value="6">Conjunction</option>
                    <option value="7">Interjection</option>
                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="definition" className="form-label">Definition</label>
                <textarea className="form-control" rows="3" name="definition" id="definition" required></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Add Word</button>
        </form>
  );
}

function AddNewWord() {
    return (
        <div>
            <WordFormHeader/>
            <WordForm/>
        </div>
    );
}

function WordListHeader() {
    return (
        <div className="mb-3">
            <h4>List of Words</h4>
        </div>
    );
}

function WordCard({word}) {
    return (
        <div className="border-1 shadow-sm rounded-3 p-3 mb-4">
            <p className="h5 text-center mb-3"><span>{word.name}</span></p>
            <div><span>({word.partOfSpeech}) {word.definition}</span></div>
        </div>);
}

function WordList({words, filterText}) {
    const cards = [];

    words.forEach((word) => {
        if (word.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {return;}
        cards.push(
            <WordCard
                word={word}
                key={word.name}/>
        );
    });

    return (
        <div>{cards}</div>
    );
}

function SearchBar({filterText, onFilterTextChange}) {
    return (
        <form>
            <div className="mb-3">
                <input type="text"
                       value={filterText}
                       onChange={(e) => onFilterTextChange(e.target.value)}
                       className="form-control"
                       placeholder="Search..."/>
            </div>
        </form>
    );
}

function FilterableWordList({words}) {
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

const WORDS = [
  {name: "Apple", partOfSpeech: "noun", definition: "A short definition"},
  {name: "Dragonfruit", partOfSpeech: "verb", definition: "A short definition"},
  {name: "Passionfruit", partOfSpeech: "noun", definition: "A short definition"},
  {name: "Spinach", partOfSpeech: "verb", definition: "A short definition"},
  {name: "Pumpkin", partOfSpeech: "noun", definition: "A short definition"},
  {name: "Peas", partOfSpeech: "noun", definition: "A short definition"}
];

export default function App() {
  return (
      <div className="container">
          <div className="row">
              <Header/>
          </div>
          <div className="row">
              <div className="col-md-5">
                  <AddNewWord/>
              </div>
              <div className="col-md-7">
                  <FilterableWordList words={WORDS}/>
              </div>
          </div>
      </div>
  );
}
