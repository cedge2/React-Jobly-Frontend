import React from "react";
import { render } from "@testing-library/react";
import CompanyCard from "./CompanyCard";

it("matches snapshot", function () {
  const { asFragment } = render(
    <CompanyCard
      handle="example"
      name="Example Company"
      description="A sample company description"
      logoUrl="https://example.com/logo.png"
    />
  );
  expect(asFragment()).toMatchSnapshot();
});
