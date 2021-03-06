import React from 'react';

import Container from 'react-bootstrap/Container';

import './error-page.styles.scss';

const ErrorPage = ({ error, resetErrorBoundary }) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || 'Something went wrong.';

  return (
    <Container as="main" className="error-page" fluid>
      <div className="error">
        <h1>{statusCode}</h1>
        <h2>Oops! There was an error:</h2>
        <p className="error-message">{message}</p>
      </div>
    </Container>
  );
};

export default ErrorPage;
