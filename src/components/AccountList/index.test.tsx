import { AccountList } from ".";
import { render, getByText } from "@testing-library/react";

describe("AccountList", () => {
  const ACCOUNTS = ["firstAccount", "secondAccount", "other2Account"];
  it("renders list items when present", () => {
    expect.assertions(ACCOUNTS.length);

    const { container } = render(
      <AccountList accounts={ACCOUNTS} listItemRender={(e) => <li>{e}</li>} />
    );

    ACCOUNTS.forEach((e) => expect(getByText(container, e)).toBeDefined());
  });
  it("renders empty state when no items are present", () => {
    const { container } = render(
      <AccountList accounts={[]} listItemRender={(e) => <li>{e}</li>} />
    );

    expect(getByText(container, "No accounts")).toBeDefined();
  });
});
