/// <reference types="vitest/globals" />
import { ReactNode } from "react";
import "jsdom";
import { afterEach } from "vitest";
import { cleanup, render } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { BrowserRouter } from "react-router-dom";
import { userEvent } from "@testing-library/user-event";

// Runs a cleanup after each test case
afterEach(() => {
  cleanup();
});

export const $T = (ui: ReactNode, { route = "/" } = {}) => {
  // window.history.pushState({}, 'Test page', route)

  return {
    user: userEvent.setup(),
    ...render(ui, { wrapper: BrowserRouter }),
  };
};
