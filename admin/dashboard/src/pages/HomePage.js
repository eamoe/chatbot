import {Card, Col, Row} from "react-bootstrap";

const HomePage = () => {
    return (
        <div className="mt-5">
            <h2>Dashboard</h2>
            <Row>
                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Total Words</Card.Title>
                            <Card.Text>1500</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <Card.Title>New Words Added</Card.Title>
                            <Card.Text>30</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Top Category</Card.Title>
                            <Card.Text>Nouns</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default HomePage
