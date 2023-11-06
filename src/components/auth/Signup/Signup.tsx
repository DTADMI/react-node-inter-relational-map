import React, {useContext, useRef} from 'react';
import authContext from "../../../contexts/AuthContext";
import {Form, Button, Card, Container} from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const passwordConfirmRef = useRef<HTMLInputElement>(null);
    const {signUp} = useContext(authContext);
    const [error, setError] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const email = emailRef?.current?.value ?? "";
        const password = passwordRef?.current?.value ?? "";
        const passwordConfirm = passwordConfirmRef?.current?.value ?? "";
        if(email && password && passwordConfirm) {

            if (password !== passwordConfirm) {
                return setError('Passwords do not match');
            }
            try {
                setError('');
                setLoading(true);
                await signUp(email, password);
                navigate("/home");
            } catch (err) {
                setError("Something went wrong while creating your account. Please try again later");
            }
        } else {
            setError("Email and password cannot be empty");
        }
        setLoading(false);
    };

    return (
        <Container
            className="d-flex align-items-center justify-content-center"
            style={{ minHeight: "100vh"}}>
            <div className="w-100" style={{ maxWidth: "400px"}}>
                <Card>
                    <Card.Body>
                        <h2 className="text-center mb-4">Sign Up</h2>
                        {error && <div className="alert alert-danger">{error}</div>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" ref={emailRef} required />
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" ref={passwordRef} required  />
                            </Form.Group>

                            <Form.Group controlId="formBasicPasswordConfirm">
                                <Form.Label>Password Confirmation</Form.Label>
                                <Form.Control type="password" placeholder="Password" ref={passwordConfirmRef} required  />
                            </Form.Group>

                            <Button disabled={loading} className="w-100 mt-2" variant="primary" type="submit">
                                Sign Up
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
                <div className="w-100 text-center mt-4">
                    <p>Already have an account? <Link to="/login">Login</Link></p>
                </div>

            </div>
        </Container>
    )
}

export default Signup
