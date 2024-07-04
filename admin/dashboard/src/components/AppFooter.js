import React from 'react';
import { Container } from 'react-bootstrap';

const AppFooter = () => {
  return (
    <footer className="mt-auto py-3 bg-dark">
      <Container>
        <p className="text-center text-white mb-0">&copy; {(new Date().getFullYear())} Tresaurus</p>
      </Container>
    </footer>
  );
};

export default AppFooter;