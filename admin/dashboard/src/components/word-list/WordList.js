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
        <div>{cards}</div>
    );
}

export default WordList
