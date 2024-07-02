import { useNavigate } from "react-router-dom";
const WordCard = ({ word }) => {

    let {_id, wordName, partOfSpeech, definition} = word
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/words/${_id}`);
    };

    return (
        <div onClick={handleClick} style={{cursor: "pointer"}}>
            <div className="border-1 shadow rounded-3 p-3 my-5">
                <p className="h5 text-center mb-3">
                    <span>{wordName.charAt(0).toLowerCase() + wordName.slice(1)}</span>
                </p>
                <div><span>({partOfSpeech}) {definition}</span></div>
            </div>
        </div>
    );
}

export default WordCard
