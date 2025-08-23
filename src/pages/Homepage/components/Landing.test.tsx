import { expect } from "vitest";
import { screen } from "@testing-library/react";

import { Landing } from "./Landing";
import { $T } from "../../../setupTests";

describe("landing", () => {
  it("renders the component", () => {
    $T(<Landing />);

    expect(
      screen.getByRole("heading", {
        name: "Improve your on-track performance, fast.",
      }),
    ).toBeInTheDocument();
  });
});
