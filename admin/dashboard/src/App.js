import AppLayout from "./components/AppLayout";
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

// <AddNewWord/>
// <FilterableWordList words={WORDS}/>
function App() {
  return (
      <AppLayout>
          <div>This is the app!</div>
      </AppLayout>
  );
}

export default App
