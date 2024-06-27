const Card = ({word}) => {
  let {wordName, partOfSpeech, definition} = word
  return (
      <div className="bg-body-tertiary my-3">
          <div>Word: <span className="fw-semibold">{wordName}</span></div>
          <div>Part of Speech: <span className="fw-semibold">{partOfSpeech}</span></div>
          <div>Definition: <span className="fw-semibold">{definition}</span></div>
      </div>
  )
}

export default Card
