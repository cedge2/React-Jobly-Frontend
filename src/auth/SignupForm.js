import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Alert from "../common/Alert";
import "./SignupForm.css";

function SignupForm({ signup }) {
  const [formInputData, setFormInputData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
  });

  const [formErrors, setFormErrors] = useState([]);

  const { username, password, firstName, lastName, email } = formInputData;

  const history = useHistory();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormInputData((formInputData) => ({ ...formInputData, [name]: value }));
  };

  async function handleSubmit(event) {
    event.preventDefault();
    let result = await signup(formInputData);
    if (result.success) {
      history.push("/");
    } else {
      setFormErrors(result.errors);
    }
  }

  return (
    <div className="SignupForm">
      <h1 className="signup-header"> Sign Up</h1>
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
        <div>
          <label className="label" htmlFor="firstName">
            First Name
          </label>
          <input
            id="firstName"
            type="text"
            name="firstName"
            value={firstName}
            onChange={handleChange}
            style={{ width: "275px" }}
          />
        </div>
        <div>
          <label className="label" htmlFor="lastName">
            Last Name
          </label>
          <input
            id="lastName"
            type="text"
            name="lastName"
            value={lastName}
            onChange={handleChange}
            style={{ width: "275px" }}
          />
        </div>
        <div>
          <label className="label" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            style={{ width: "275px" }}
          />
        </div>
        {formErrors.length ? (
          <Alert type="danger" messages={formErrors} />
        ) : null}

        <button className="signup-btn">Submit</button>
      </form>
    </div>
  );
}
export default SignupForm;