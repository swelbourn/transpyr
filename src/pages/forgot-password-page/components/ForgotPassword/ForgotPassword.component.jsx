import React, { useState } from 'react';

import { Col, Row } from 'react-bootstrap';

import myAxios from '../../../../auth/axios.config';

import { FormInput } from '../../../../components/FormInput/FormInput.component';
import { CustomButton } from '../../../../components/CustomButton/CustomButton.component';
import { ResponseMessage } from '../../../../components/ResponseMessage/ResponseMessage.component';

import './ForgotPassword.styles.scss';

export const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [response, setResponse] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await myAxios().post(`http://localhost:3000/api/users/forgot-password`, {
        email,
      });
      setEmail('');
      setSuccess(true);
    } catch (err) {
      setResponse(err.response.data.message);
    }
  };

  return !success ? (
    <Row className="forgot-password">
      <Col xs={12} md={6}>
        <p className="forgot-password-text">
          Enter your email adress below. If there is an account associated with
          it, a link to reset the password will be sent to that email address.
        </p>
      </Col>
      <Col xs={12} md={6}>
        <form onSubmit={handleSubmit}>
          <FormInput
            name="email"
            type="email"
            id="email"
            value={email}
            handleChange={(e) => setEmail(e.target.value)}
            label="Email"
            required
          />
          <CustomButton type="submit">Submit</CustomButton>
        </form>
        {response && <ResponseMessage error>{response}</ResponseMessage>}
      </Col>
    </Row>
  ) : (
    <Col xs={12}>
      <p>
        A password reset email has been sent to the specified address. Follow
        the link in the email to reset your password.
      </p>
    </Col>
  );
};
