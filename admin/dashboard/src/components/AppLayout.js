import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";
import {Container, Row, Col} from "react-bootstrap";

const AppLayout = ({children}) => {
  return (
      <Container className="d-flex flex-column min-vh-100 p-0">
          <Row className="w-100">
              <Col>
                  <AppHeader />
              </Col>
          </Row>
          <Row className="flex-grow-1 w-100">
              <Col>{children}</Col>
          </Row>
          <Row className="w-100">
              <Col>
                  <AppFooter />
              </Col>
          </Row>
      </Container>
  )
}
export default AppLayout
