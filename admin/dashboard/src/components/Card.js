const WordCard = ({ word }) => {
    let {wordName, partOfSpeech, definition} = word
    const name = wordName.charAt(0).toUpperCase() + wordName.slice(1)
        return (
            <div className="border-1 shadow-sm rounded-3 p-3 mb-4">
                <p className="h5 text-center mb-3"><span>{name}</span></p>
                <div><span>({partOfSpeech}) {definition}</span></div>
            </div>
        );
    }

export default WordCard
