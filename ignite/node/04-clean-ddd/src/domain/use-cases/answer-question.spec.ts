import { expect, test } from "vitest";
import { AnswerQuestionUseCase } from "./answer-question";

test("create an answer", () => {
  const answerQuestion = new AnswerQuestionUseCase();

  const answer = answerQuestion.execute({
    instructorId: "XX01",
    questionId: "XX02",
    content: "New Answer",
  });

  expect(answer.content).toEqual("New Answer");
});
