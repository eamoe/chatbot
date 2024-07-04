import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import AppLayout from '../components/AppLayout';
import ShowAlert from '../components/ShowAlert';
import { adminConfig } from '../config';

const REACT_APP_BASE_URL = adminConfig.REACT_APP_BASE_URL;

const NewWord = () => {

    const emptyWord = {
        wordName: '',
        partOfSpeech: 'noun',
        definition: '',
    };

    const [newWord, setNewWord] = useState(emptyWord);
    const [error, setError] = useState([]);
    const [alert, setAlert] = useState({ show: false, message: '', variant: '' });
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        addWord(newWord);
        setNewWord(emptyWord);
        setAlert({ show: false, message: '', variant: '' }); // Reset the alert state before making a new request
    };

    const onChange = (e) => {
        setNewWord({ ...newWord, [e.target.name]: e.target.value });
    };

    const handleReset = () => {
        setNewWord(emptyWord);
    };

    const addWord = async (newWord) => {
        const response = await fetch(`${REACT_APP_BASE_URL}/words`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newWord),
        });

        const data = await response.json();

        if (!response.ok) {
            let errArray = data.detail.map((el) => `${el.loc[1]} - ${el.msg}`);
            setError(errArray);
            setAlert({ show: true, variant: 'danger', message: errArray.join(', ') });
        } else {
            setError([]);
            setAlert({ show: true, variant: 'success', message: 'Word added successfully!' });
        }
    };

    useEffect(() => {
        if (alert.show) {
            const timer = setTimeout(() => setAlert({ ...alert, show: false }), 2000);
            return () => clearTimeout(timer);
        }
    }, [alert]);

  return (
      <AppLayout>
          <Container className="my-5">

              <Row className="justify-content-center">
                  <Col md={8}>
                      <Card className="shadow-sm no-hover">
                          <Card.Body>
                              <Card.Title className="text-center mb-4">Add New Word</Card.Title>
                              <Form onSubmit={handleSubmit}>
                                  <Row>
                                      <Col md={6}>
                                          <Form.Group className="mb-3" controlId="wordName">
                                              <Form.Label>Word</Form.Label>
                                              <Form.Control
                                                  type="text"
                                                  name="wordName"
                                                  value={newWord.wordName}
                                                  onChange={onChange}
                                                  placeholder="Enter new word..."
                                                  required
                                              />
                                              </Form.Group>
                                          </Col>
                                      <Col md={6}>
                                          <Form.Group className="mb-3" controlId="partOfSpeech">
                                              <Form.Label>Part of Speech</Form.Label>
                                              <Form.Select
                                                  name="partOfSpeech"
                                                  value={newWord.partOfSpeech}
                                                  onChange={onChange}
                                                  required
                                              >
                                                  <option value="noun">noun</option>
                                                  <option value="pronoun">pronoun</option>
                                                  <option value="verb">verb</option>
                                                  <option value="adjective">adjective</option>
                                                  <option value="adverb">adverb</option>
                                                  <option value="preposition">preposition</option>
                                                  <option value="conjunction">conjunction</option>
                                                  <option value="interjection">interjection</option>
                                              </Form.Select>
                                          </Form.Group>
                                      </Col>
                                  </Row>
                                  <Form.Group className="mb-3" controlId="definition">
                                      <Form.Label>Definition</Form.Label>
                                      <Form.Control
                                          as="textarea"
                                          rows={5}
                                          name="definition"
                                          value={newWord.definition}
                                          onChange={onChange}
                                          placeholder="Enter definition..."
                                          required
                                      />
                                  </Form.Group>
                                  <div className="d-flex justify-content-center">
                                      <Button variant="primary" type="submit" className="mx-2">Add</Button>
                                      <Button variant="secondary" type="reset" onClick={handleReset} className="mx-2">Reset</Button>
                                  </div>
                              </Form>
                          </Card.Body>
                      </Card>
                  </Col>
              </Row>

              <Row className="mt-3">
                  <Col md={2}></Col>
                  <Col md={8}>
                      {alert.show && (
                          <Alert variant={alert.variant} onClose={() => setAlert({ ...alert, show: false })} dismissible>
                              {alert.message}
                          </Alert>
                      )}
                  </Col>
                  <Col md={2}></Col>
              </Row>

          </Container>
      </AppLayout>
  )
}
export default NewWord
