import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Button from "./Button";
import Form from "./Form";
import TextInput from "./TextInput";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const history = useNavigate();

  async function handleForm(e) {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await login(email, password);
      history("/");
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError("Failed to login!");
    }
  }
  return (
    <Form style={{ height: "330px" }} onSubmit={handleForm}>
      <TextInput
        required
        type="text"
        placeholder="Enter email"
        icon="alternate_email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <TextInput
        required
        type="password"
        placeholder="Enter password"
        icon="lock"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <Button disabled={loading} type="submit">
        Submit now
      </Button>

      {error && <p className="error ">{error}</p>}

      <div className="info">
        Don't have an account? <Link to="/signup">Signup</Link> instead.
      </div>
    </Form>
  );
}
