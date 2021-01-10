import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import MyFirstBlogPost from "../pages/my-first-blog-post.md";

it("MyFirstBlogPost renders smoke test without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<MyFirstBlogPost />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("MyFirstBlogPost renders unchanged", () => {
  const tree = renderer.create(<MyFirstBlogPost />).toJSON();
  expect(tree).toMatchSnapshot();
});
