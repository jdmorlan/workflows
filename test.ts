import { assertEquals } from "testing/asserts.ts";
import Workflow, { Question, QuestionDoc, QuestionTypes } from "./src/index.ts";

const questions: Array<QuestionDoc> = [
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

Deno.test("can update question value", () => {
  const workflow = new Workflow();
  workflow.questions(questions);

  const question = workflow.goToQuestion(0);
  question.setValue()("jay");

  assertEquals(question.value, "jay");
});

Deno.test("can register for question change events", () => {
  const workflow = new Workflow();
  workflow.questions(questions);

  workflow.on("question:change", (question: Question) => {
    question.setValue()("bob");
    assertEquals(question.value, "bob");
  });

  workflow.next();
});
