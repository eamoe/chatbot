const WordForm = () => {
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
          <button type="submit" className="btn btn-primary">Add Word</button>
      </form>
  )
}

export default WordForm
