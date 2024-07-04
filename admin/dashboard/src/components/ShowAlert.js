import React, { useState, useEffect } from 'react';
import { Alert } from 'react-bootstrap';

function ShowAlert({ show, variant, message }) {
  const [showAlert, setShowAlert] = useState(show);

  useEffect(() => {
    setShowAlert(show);
  }, [show]);

  return (
    <div className="px-0 mt-3">
      {showAlert && (
        <Alert variant={variant} onClose={() => setShowAlert(false)} dismissible>
          <p>{message}</p>
        </Alert>
      )}
    </div>
  );
}

export default ShowAlert;
