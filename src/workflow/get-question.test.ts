import { assertEquals } from "testing/asserts.ts";

import Question, { QuestionDoc, QuestionTypes } from "../question.ts";
import getQuestion, { Directions } from "./get-question.ts";

const docs: Array<QuestionDoc> = [
  {
    questionType: QuestionTypes.TEXT,
    property: "name",
    dataType: "string"
  },
  {
    questionType: QuestionTypes.TEXT,
    property: "address",
    dataType: "string"
  }
];

const questions: Array<Question> = docs.map(doc => new Question(doc));

Deno.test("it runs", () => {
  const { question, stepPosition } = getQuestion({
    questions: questions,
    direction: Directions.NEXT,
    currentStep: 0,
    formValues: {},
    canSkip: () => false
  });

  assertEquals(1, 1);
});
