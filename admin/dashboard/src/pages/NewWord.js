import AppLayout from "../components/AppLayout";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

let BASE_URL = "http://localhost:3000/words"

const NewWord = () => {

    const emptyWord = {
        wordName: "",
        partOfSpeech: "noun",
        definition: "",
    };

    const [newWord, setNewWord] = useState(emptyWord)
    const [error, setError] = useState([])

    const navigate = useNavigate();

    const handleSubmit = (e)=>{
        e.preventDefault()
        addWord(newWord)
    }

    const onChange = (e) => {
        setNewWord({...newWord, [e.target.name]: e.target.value})
    }

    const handleReset = (e) => {
        setNewWord(emptyWord)
    }

    const addWord = async (newWord)=>{
        const response = await fetch(BASE_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newWord),
        });

        const data = await response.json()


        if (!response.ok) {
            let errArray = data.detail.map((el) => {
                return `${el.loc[1]} -${el.msg}`;
            });
            setError(errArray);
        } else {
            console.log("Successfully added new word:", data); // Debugging log
            setError([]);
            navigate("/words");
        }
    };

  return (
      <AppLayout>
          <div className="row my-5">
              <h2 className="text-center">Add New Word</h2>
              <div className="col-2"></div>
              <div className="col-8">
                  <form method="post" onSubmit={handleSubmit}>
                      <div className="mb-3">
                          <label htmlFor="wordName" className="form-label">Word</label>
                          <input
                              type="text"
                              onChange={onChange}
                              value={newWord.wordName}
                              className="form-control"
                              name="wordName"
                              id="wordName"
                              placeholder="new word..."
                              required
                          />
                      </div>
                      <div className="mb-3">
                          <label htmlFor="partOfSpeech" className="form-label">Part of Speech</label>
                          <select
                              className="form-select"
                              name="partOfSpeech"
                              id="partOfSpeech"
                              aria-label="Parts of speech"
                              required
                              onChange={onChange}
                              value={newWord.partOfSpeech}
                          >
                              <option value="noun">noun</option>
                              <option value="pronoun">pronoun</option>
                              <option value="verb">verb</option>
                              <option value="adjective">adjective</option>
                              <option value="adverb">adverb</option>
                              <option value="preposition">preposition</option>
                              <option value="conjunction">conjunction</option>
                              <option value="interjection">interjection</option>
                          </select>
                      </div>
                      <div className="mb-3">
                          <label htmlFor="definition" className="form-label">Definition</label>
                          <textarea
                              className="form-control"
                              rows="5"
                              name="definition"
                              id="definition"
                              required
                              onChange={onChange}
                              value={newWord.definition}
                          />
                      </div>

                      <button type="submit" onClick={handleSubmit} className="btn btn-primary mx-2">Add</button>
                      <button type="reset" onClick={handleReset} className="btn btn-secondary mx-2">Reset</button>
                  </form>
              </div>
              <div className="col-2"></div>
          </div>
      </AppLayout>
  )
}
export default NewWord
