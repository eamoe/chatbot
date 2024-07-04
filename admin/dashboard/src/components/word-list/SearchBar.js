import React from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';

const SearchBar = ({ filterText, onFilterTextChange }) => {
    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={8}>
                    <Form>
                        <Form.Group className="mb-3" controlId="searchBar">
                            <Form.Control
                                type="text"
                                value={filterText}
                                onChange={(e) => onFilterTextChange(e.target.value)}
                                placeholder="Search..."
                                className="shadow-sm"
                            />
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default SearchBar;