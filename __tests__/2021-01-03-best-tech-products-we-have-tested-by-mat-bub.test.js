import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import Post from "../pages/blog/2021-01-03-best-tech-products-we-have-tested-by-mat-bub.md";

it("Post renders smoke test without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Post />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("Post renders unchanged", () => {
  const tree = renderer.create(<Post />).toJSON();
  expect(tree).toMatchSnapshot();
});
