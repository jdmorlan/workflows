import Question from "../question.ts";

export enum Directions {
  PREVIOUS,
  NEXT
}

export interface canSkipOpts {
  question: Question;
  questions: Array<Question>;
  formValues: object;
}

export interface GetQuestionOpts {
  questions: Array<Question>;
  direction: Directions;
  currentStep: number;
  formValues: object;
  canSkip(opts: canSkipOpts): boolean;
}

export type GetQuestionResponse = {
  question: Question | null;
  stepPosition: number | null;
};

export default (opts: GetQuestionOpts): GetQuestionResponse => {
  const { questions, currentStep, formValues, canSkip } = opts;

  let question: Question | null = null;
  let step: number = currentStep;
  let skippable: boolean = true;

  while (skippable) {
    opts.direction === Directions.PREVIOUS ? step-- : step++;
    question = questions[step];
    skippable = canSkip({
      question,
      questions,
      formValues
    });
  }

  return {
    question: question,
    stepPosition: step
  };
};
