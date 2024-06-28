function Header() {
  return (
      <div id="header" className="row my-5">
          <h1 className="text-center">Tresaurus Admin Application</h1>
      </div>
  );
}

function WordFormHeader() {
    return (
        <h4 className="mb-3">Add a New Word</h4>
    );
}

function WordForm() {
    return (
        <form method="post" action="/add_word">
          <div className="mb-3">
              <label htmlFor="name" className="form-label">Word:</label>
              <input type="text" className="form-control" name="name" id="name" required/>
          </div>
          <div className="mb-3">
              <label htmlFor="part_of_speech" className="form-label">Part of Speech:</label>
              <input type="text" className="form-control" name="part_of_speech" id="part_of_speech"
                     required/>
          </div>
          <div className="mb-3">
              <label htmlFor="definition" className="form-label">Definition:</label>
              <input type="text" className="form-control" name="definition" id="definition" required/>
          </div>
          <button type="submit" className="btn btn-primary">Save</button>
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
        <h4 className="mb-3">List of Words</h4>
    );
}

function WordCard({word}) {
    return (
        <div className="border-1 shadow-sm rounded-3 p-3 mb-4">
            <p className="h5 text-center mb-3"><span>{word.name}</span></p>
            <div><span>({word.partOfSpeech}) {word.definition}</span></div>
        </div>);
}

function WordList({words}) {
    const cards = [];

    words.forEach((word) => {
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

function SearchBar() {
    return (
        <form>
            <div className="mb-3">
                <input type="text" className="form-control" placeholder="Search..."/>
            </div>
        </form>
    );
}

function FilterableWordList({words}) {
    return (
        <div>
            <WordListHeader/>
            <SearchBar/>
            <WordList words={words} />
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
