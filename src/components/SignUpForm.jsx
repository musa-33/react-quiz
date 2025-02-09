import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Button from "./Button";
import CheckBox from "./CheckBox";
import Form from "./Form";
import TextInput from "./TextInput";

export default function SignUpForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { signup } = useAuth();
  const routeHistory = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setError("Password not match.");
    }

    try {
      setError("");
      setLoading(true);
      await signup(email, password, username);
      routeHistory("/");
      console.log("login successful");
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError("Failed to signup");
    }
  }

  return (
    <Form style={{ height: "500px" }} onSubmit={handleSubmit}>
      <TextInput
        type="text"
        required
        placeholder="Enter name"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
        icon="person"
      />
      <TextInput
        type="text"
        required
        placeholder="Enter email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        icon="alternate_email"
      />
      <TextInput
        type="password"
        required
        placeholder="Enter password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        icon="lock"
      />
      <TextInput
        type="password"
        required
        placeholder="Confirm password"
        value={confirmPassword}
        onChange={(e) => {
          setConfirmPassword(e.target.value);
        }}
        icon="lock_clock"
      />
      <CheckBox
        type="checkbox"
        text="I agree to the Terms & Conditions"
        required
        checked={agree}
        onChange={(e) => {
          setAgree(e.target.checked);
        }}
      />
      <Button disabled={loading} type="submit">
        Submit now
      </Button>

      {error && <p className="error ">{error}</p>}

      <div className="info">
        Already have an account? <Link to="/login">Login</Link> instead.
      </div>
    </Form>
  );
}
