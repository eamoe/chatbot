import {Navbar, Container, Nav} from 'react-bootstrap';
import {useLocation} from "react-router-dom";

const AppHeader = () => {
    const location = useLocation();
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">Tresaurus</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto" activeKey={location.pathname}>
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/words">Words</Nav.Link>
                        <Nav.Link href="/words/new">New word</Nav.Link>
                        <Nav.Link href="/about">About</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default AppHeader


