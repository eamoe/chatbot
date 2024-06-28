const WordCard = ({ word }) => {
    let {name, partOfSpeech, definition} = word
    const wordName = name.charAt(0).toUpperCase() + name.slice(1)
        return (
        <div className="border-1 shadow-sm rounded-3 p-3 mb-4">
            <p className="h5 text-center mb-3"><span>{wordName}</span></p>
            <div><span>({partOfSpeech}) {definition}</span></div>
        </div>);
    }

export default WordCard
