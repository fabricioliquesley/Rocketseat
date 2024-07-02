import { expect, test } from "vitest";
import { AnswerQuestionUseCase } from "./answer-question";
import { AnswersRepository } from "../repositories/answers-repository";

const fakeAnswersRepository: AnswersRepository = {
  create: async (answer) => {
    return
  },
}

test("create an answer", async () => {
  const answerQuestion = new AnswerQuestionUseCase(fakeAnswersRepository);

  const answer = await answerQuestion.execute({
    instructorId: "XX01",
    questionId: "XX02",
    content: "New Answer",
  });

  expect(answer.content).toEqual("New Answer");
});
