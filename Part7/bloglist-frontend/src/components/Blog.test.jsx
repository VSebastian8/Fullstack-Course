import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";
import { Provider } from "react-redux";
import store from "../store";

describe("<Blog />", () => {
  test("renders only title and author by default", () => {
    const blog = {
      id: "69a457be851ef6488b1c5dd9",
      likes: 18,
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      user: {
        username: "dijstrack",
        name: "Edsger W. Dijkstra",
        id: "699ec6fad81ee539baa1419f",
      },
    };

    render(
      <Provider store={store}>
        <Blog blog={blog} />{" "}
      </Provider>,
    );
    // Displays Title and Author
    screen.getByText("Go To Statement Considered Harmful - Edsger W. Dijkstra");
    // Doesn't display likes
    const likesElement = screen.queryByText("likes 18", { exact: false });
    expect(likesElement).toBeNull();
    // Doesn't display url
    const urlElement = screen.queryByText(
      "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      { exact: false },
    );
    expect(urlElement).toBeNull();
  });

  test("clicking view reveals likes and url", async () => {
    const blog = {
      id: "69a457be851ef6488b1c5dd9",
      likes: 18,
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      user: {
        username: "dijstrack",
        name: "Edsger W. Dijkstra",
        id: "699ec6fad81ee539baa1419f",
      },
    };

    render(
      <Provider store={store}>
        <Blog blog={blog} />
      </Provider>,
    );

    const user = userEvent.setup();
    const viewButton = screen.getByText("view");
    await user.click(viewButton);

    // Displays Title, Author, Likes and Url
    screen.getByText("Go To Statement Considered Harmful - Edsger W. Dijkstra");
    screen.getByText("likes 18", { exact: false });
    screen.getByText(
      "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      { exact: false },
    );
  });
});
