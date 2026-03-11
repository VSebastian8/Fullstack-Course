import { render, screen } from "@testing-library/react";
import CreateForm from "./CreateForm";
import userEvent from "@testing-library/user-event";

test.only("<CreateForm /> calls event handler prop with right details", async () => {
  const createBlog = vi.fn(() => true);
  const mockedRef = { current: { toggleVisibility: () => {} } };
  const user = userEvent.setup();

  render(<CreateForm createBlog={createBlog} blogFormRef={mockedRef} />);

  const title = screen.getByLabelText("title");
  const author = screen.getByLabelText("author");
  const url = screen.getByLabelText("url");
  const createButton = screen.getByText("create");

  await user.type(title, "Chemistry is fun when you do it with friends");
  await user.type(author, "Walter Gray");
  await user.type(url, "https://www.chem/is/fun.com");

  // Check that the form fields have changed
  expect(title).toHaveValue("Chemistry is fun when you do it with friends");
  await user.click(createButton);

  expect(createBlog.mock.calls).toHaveLength(1);
  // Check that the create handler is called with the form right details
  const newBlog = createBlog.mock.calls[0][0];
  expect(newBlog.title).toBe("Chemistry is fun when you do it with friends");
  expect(newBlog.author).toBe("Walter Gray");
  expect(newBlog.url).toBe("https://www.chem/is/fun.com");

  // Check that the form has cleared the values
  expect(title).toHaveValue("");
});
