import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Card, Container, Form, Row, Col, Alert } from 'react-bootstrap';
import AppLayout from '../components/AppLayout';
import { adminConfig } from '../config';

const REACT_APP_BASE_URL = adminConfig.REACT_APP_BASE_URL;

const Word = () => {

    let { id } = useParams();
    const navigate = useNavigate();

    const [word, setWord] = useState(null);
    const [definition, setDefinition] = useState('');
    const [wordName, setWordName] = useState('');
    const [partOfSpeech, setPartOfSpeech] = useState('');
    const [error, setError] = useState([]);
    const [alert, setAlert] = useState({ show: false, message: '', variant: '' });

    const onChangeWordName = (event) => setWordName(event.target.value);
    const onChangePartOfSpeech = (event) => setPartOfSpeech(event.target.value);
    const onChangeDefinition = (event) => setDefinition(event.target.value);

    const getWord =  async() => {
        const res = await fetch(`${REACT_APP_BASE_URL}/words/${id}`);
        if (!res.ok) {
            const data = await res.json();
            const errArray = data.detail.map((el) => `${el.loc[1]} - ${el.msg}`);
            setError(errArray);
            setAlert({ show: true, variant: 'danger', message: errArray.join(', ') });
        } else {
            const data = await res.json();
            setWord(data);
            setWordName(data.wordName);
            setPartOfSpeech(data.partOfSpeech);
            setDefinition(data.definition);
        }
    }

    const handleDelete = async () => {

        const response = await fetch(`${REACT_APP_BASE_URL}/words/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
            const data = await response.json();
            const errArray = data.detail.map((el) => `${el.loc[1]} - ${el.msg}`);
            setError(errArray);
            setAlert({ show: true, variant: 'danger', message: errArray.join(', ') });
        } else {
            setError([]);
            navigate('/words');
        }
    }

    const updateWord = async () => {

        const response = await fetch(`${REACT_APP_BASE_URL}/words/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ wordName, partOfSpeech, definition }),
        });

        const data = await response.json();
        if (!response.ok) {
            const errArray = data.detail.map((el) => `${el.loc[1]} - ${el.msg}`);
            setError(errArray);
            setAlert({ show: true, variant: 'danger', message: errArray.join(', ') });
        } else {
            setError([]);
            setAlert({ show: true, variant: 'success', message: 'Word was updated successfully!' });
            getWord();
        }
    }

    useEffect(() => {
        getWord(id);
    }, [id]);

    useEffect(() => {
        if (alert.show) {
            const timer = setTimeout(() => setAlert({ ...alert, show: false }), 2000);
            return () => clearTimeout(timer);
        }
    }, [alert]);

  return (
      <AppLayout>
          <Container className="my-4">

              {word && (
                  <Row>
                      <Col md={6} className="text-center">
                          <img src="https://fastly.picsum.photos/id/824/300/300.jpg?hmac=kIWcLr0RPi2ZRIEvyq0jKoiPhfU5ixYeEy8206NoZGQ" alt="Placeholder" className="img-fluid" />
                      </Col>
                      <Col md={6}>
                          <Row>
                              <Col md={12}>
                                  <Card Card className="shadow-sm no-hover">
                                      <Card.Body>
                                          <Card.Title className="text-center">
                                              {word.wordName} <span className="text-muted">({word.partOfSpeech})</span>
                                          </Card.Title>
                                          <Form className="mt-4">
                                              <Form.Group className="mb-3 d-none" controlId="wordName">
                                                  <Form.Label>Word</Form.Label>
                                                  <Form.Control
                                                      type="text"
                                                      placeholder="Word..."
                                                      value={wordName}
                                                      onChange={onChangeWordName}
                                                      readOnly
                                                  />
                                              </Form.Group>
                                              <Form.Group className="mb-3 d-none" controlId="partOfSpeech">
                                                  <Form.Label>Part of Speech</Form.Label>
                                                  <Form.Control
                                                      type="text"
                                                      placeholder="Part of speech..."
                                                      value={partOfSpeech}
                                                      onChange={onChangePartOfSpeech}
                                                      readOnly
                                                  />
                                              </Form.Group>
                                              <Form.Group className="mb-3" controlId="definition">
                                                  <Form.Label>Definition</Form.Label>
                                                  <Form.Control
                                                      as="textarea"
                                                      rows={3}
                                                      placeholder="Add new value..."
                                                      value={definition}
                                                      onChange={onChangeDefinition}
                                                  />
                                              </Form.Group>
                                              <div className="d-flex justify-content-between">
                                                  <Button variant="danger" onClick={handleDelete}>Delete Word</Button>
                                                  <Button variant="primary" onClick={updateWord}>Edit Word</Button>
                                              </div>
                                          </Form>
                                      </Card.Body>
                                  </Card>
                              </Col>

                              <Col className="mt-3" md={12}>
                                  {alert.show && (
                                      <Alert variant={alert.variant} onClose={() => setAlert({ ...alert, show: false })} dismissible>
                                          {alert.message}
                                      </Alert>
                                  )}
                              </Col>
                          </Row>
                      </Col>
                  </Row>
              )}

          </Container>
      </AppLayout>
  )
}
export default Word
