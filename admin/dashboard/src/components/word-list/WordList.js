import WordCard from "./Card";
const WordList = ({words, filterText}) => {
    const cards = [];

    words.forEach((word) => {
        if (word.wordName.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {return;}
        cards.push(
            <WordCard
                word={word}
                key={word.name}/>
        );
    });

    return (
        <div className="row">
            <div className="col-md-2"></div>
            <div className="col-md-8">
                <div>{cards}</div>
            </div>
            <div className="col-md-2"></div>
        </div>
    );
}

export default WordList
