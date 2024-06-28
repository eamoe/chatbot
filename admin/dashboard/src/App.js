import './App.css';
import Header from "./components/Header";
import WordForm from "./components/WordForm";
import WordCard from "./components/Card";

function App() {
    let words = [
        {wordName: "Fruit", partOfSpeech: "noun", definition: "A short definition"},
        { wordName: "Milk", partOfSpeech: "noun", definition: "A short definition"},
        { wordName: "Change", partOfSpeech: "verb", definition: "A short definition"},
        { wordName: "Sentence", partOfSpeech: "noun", definition: "A short definition"},
        { wordName: "Abbreviation", partOfSpeech: "noun", definition: "A short definition"}
  ]

    return (
    <div className="App">
        <div className="container">
            <Header/>
            <div className="row">

                <div className="col-md-5">
                    <h2 className="py-3">Add New Word</h2>
                    <WordForm/>
                </div>

                <div className="col-md-7">
                    <h2 className="py-3">List of Words</h2>
                    <ul>
                        {words.map(
                            (el) => {
                                return (
                                    <WordCard key={el.id} word={el}/>
                                )
                            }
                        )}
                    </ul>
                </div>

            </div>
        </div>
    </div>
    );
}

export default App;
