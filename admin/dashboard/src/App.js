import AppHeader from "./components/AppHeader";
import AddNewWord from "./components/add-new-word/AddNewWord";
import FilterableWordList from "./components/word-list/FilterableWordList";

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
              <AppHeader/>
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
