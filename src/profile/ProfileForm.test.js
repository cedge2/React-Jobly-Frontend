import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import Profile from "./ProfileForm";
import { UserProvider } from "../testUtils";

// TODO: woefully under-tested!
it("matches snapshot", function () {
  const { asFragment } = render(
    <UserProvider>
      <Profile />
    </UserProvider>
  );
  expect(asFragment()).toMatchSnapshot();
});


it("updates form input and submits", async function () {
  const { getByLabelText, getByText } = render(
    <UserProvider>
      <Profile />
    </UserProvider>
  );


  fireEvent.change(getByLabelText("First Name"), { target: { value: "NewFirstName" } });
  fireEvent.change(getByLabelText("Last Name"), { target: { value: "NewLastName" } });


  fireEvent.click(getByText("Save Changes"));


  await waitFor(() => {
    expect(getByText("Updated successfully!")).toBeInTheDocument();
  });
});


it("displays form validation errors", async function () {
  const { getByLabelText, getByText } = render(
    <UserProvider>
      <Profile />
    </UserProvider>
  );


  fireEvent.click(getByText("Save Changes"));


  await waitFor(() => {
    expect(getByText("Username is required.")).toBeInTheDocument();
    expect(getByText("Email is required.")).toBeInTheDocument();
  });
});


