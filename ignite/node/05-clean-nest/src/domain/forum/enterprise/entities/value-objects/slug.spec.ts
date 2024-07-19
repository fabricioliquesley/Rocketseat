import {test, expect} from "vitest"
import { Slug } from "./slug";

test("it should be able to create a ne slug from text", () => {
  const slug = Slug.createFromText("An Example Title");

  expect(slug.value).toEqual("an-example-title");
});
