import React from 'react';
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Card.css';

const WordCard = ({ word }) => {

    const { _id, wordName, partOfSpeech, definition } = word;
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/words/${_id}`);
    };

    return (
        <Card className="my-3 shadow-sm" onClick={ handleClick } style={{ cursor: 'pointer' }}>
            <Card.Body>
                <Card.Title className="text-center">
                    {wordName.charAt(0).toLowerCase() + wordName.slice(1)}
                </Card.Title>
                <Card.Text className="text-center">
                    <small className="text-muted">({ partOfSpeech })</small> { definition }
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default WordCard
