import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Alert from "../common/Alert";
import "./LoginForm.css";

function LoginForm({ login }) {
  const [formInputData, setFormInputData] = useState({
    username: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState([]);

  const { username, password } = formInputData;

  const history = useHistory();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormInputData((formInputData) => ({ ...formInputData, [name]: value }));
  };

  async function handleSubmit(event) {
    event.preventDefault();
    let result = await login(formInputData);
    if (result.success) {
      history.push("/");
    } else {
      setFormErrors(result.errors);
    }
  }

  return (
    <div className="LoginForm">
      <h1 className="login-header">Please Login</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label className="label" htmlFor="username">
            Username
          </label>
          <input
            id="username"
            type="text"
            name="username"
            value={username}
            onChange={handleChange}
            style={{ width: "275px" }}
          />
        </div>
        <div>
          <label className="label" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            style={{ width: "275px" }}
          />
        </div>

        {formErrors.length ? (
          <Alert type="danger" messages={formErrors} />
        ) : null}

        <button className="Login-btn">Submit</button>
      </form>
    </div>
  );
}
export default LoginForm;