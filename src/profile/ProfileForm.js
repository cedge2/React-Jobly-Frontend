import React, { useState, useContext } from "react";
import Alert from "../common/Alert";
import JoblyApi from "../api/api";
import UserContext from "../auth/UserContext";
import "./ProfileForm.css";

function ProfileForm() {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [formInputData, setFormInputData] = useState({
    username: currentUser.username,
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    email: currentUser.email,
    password: "",
  });

  const [formErrors, setFormErrors] = useState([]);

  const [saveConfirmed, setSaveConfirmed] = useState(false);

  const handleChange = (event) => {

    const { name, value } = event.target;

    setFormInputData((formInputData) => ({ ...formInputData, [name]: value }));

    setFormErrors([]);
  };

  async function handleSubmit(event) {
    event.preventDefault();

    let profileData = {
      firstName: formInputData.firstName,
      lastName: formInputData.lastName,
      email: formInputData.email,
      password: formInputData.password,
    };

    let username = formInputData.username;

    let updatedUser;

    try {

      updatedUser = await JoblyApi.saveProfile(username, profileData);
    } catch (errors) {
      setFormErrors(errors);
      return;
    }

    setFormInputData((formInputData) => ({ ...formInputData, password: "" }));

    setFormErrors([]);
    setSaveConfirmed(true);

    setCurrentUser(updatedUser);
  }

  return (
    <div className="ProfileForm">
      <h1> Profile</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="label" htmlFor="username">
            Username
          </label>
          <input
            id="username"
            type="text"
            name="username"
            value={formInputData.username}
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
            value={formInputData.firstName}
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
            value={formInputData.lastName}
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
            value={formInputData.email}
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
            value={formInputData.password}
            onChange={handleChange}
            style={{ width: "275px" }}
          />
        </div>

        {formErrors.length ? (
          <Alert type="danger" messages={formErrors} />
        ) : null}

        {saveConfirmed ? (
          <Alert type="success" messages={["Updated successfully!"]} />
        ) : null}

        <button className="profile-btn">Save Changes</button>
      </form>
    </div>
  );
}
export default ProfileForm;