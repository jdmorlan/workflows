import EventEmitter from "../emitter.ts";
import Question, { QuestionDoc } from "../question.ts";
import Form from "../form.ts";
import getQuestion, { Directions } from "./get-question.ts";

class Workflow extends EventEmitter {
  private _currentStep: number;
  private _questions: Array<Question>;
  private _form: Form;

  constructor() {
    super();

    this._currentStep = 0;
    this._questions = [];
    this._form = new Form();
  }

  get size() {
    return this._questions.length;
  }

  questions(questions: Array<QuestionDoc>) {
    this._questions = questions.map(doc => new Question(doc, this._form));
  }

  goToQuestion(step: number): Question {
    const question = this._questions[step];
    this._currentStep = step;

    this.emit("question:change", question);
    return question;
  }

  get canPrev() {
    if (this.size === 0) {
      return false;
    }

    return this._currentStep > 0;
  }

  canNext() {
    if (this.size === 0) {
      return false;
    }

    const maxQuestionIndex = this._questions.length - 1;
    return this._currentStep < maxQuestionIndex;
  }

  previous(): Question | null {
    if (!this.canPrev) {
      return null;
    }

    const { question, stepPosition } = getQuestion({
      questions: this._questions,
      direction: Directions.PREVIOUS,
      currentStep: this._currentStep,
      formValues: this._form.toJS()
    });

    if (stepPosition) {
      this._currentStep = stepPosition;
      this.emit("question:change", question);
      return question;
    }

    return null;
  }

  next(): Question | null {
    if (!this.canNext) {
      return null;
    }

    const { question, stepPosition } = getQuestion({
      questions: this._questions,
      direction: Directions.NEXT,
      currentStep: this._currentStep,
      formValues: this._form.toJS(),
      canSkip: () => false
    });

    if (stepPosition) {
      this._currentStep = stepPosition;
      this.emit("question:change", question);
      return question;
    }

    return null;
  }
}

export default Workflow;
