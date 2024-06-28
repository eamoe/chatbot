const WordForm = () => {
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

export default WordForm
