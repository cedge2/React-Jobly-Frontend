import React from "react";
import { render } from "@testing-library/react";
import Alert from "./Alert";

it("matches snapshot", function () {
  const { asFragment } = render(<Alert type="danger" messages={["Error 1", "Error 2"]} />);
  expect(asFragment()).toMatchSnapshot();
});
