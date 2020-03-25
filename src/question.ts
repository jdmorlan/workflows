import Form from "./form.ts";

enum SkipParamTypes {
  CONSTANT,
  PROPERTY
}

enum QuestionSkipConfigTypes {
  EQUALS
}

interface SkipParam {
  type: SkipParamTypes;
  value: any;
}

interface QuestionSkipConfig {
  type: QuestionSkipConfigTypes;
  params: Array<SkipParam>;
}

export enum QuestionTypes {
  AUTOCOMPLETE,
  TEXT,
  NUMBER,
  COLLECTION
}

export interface QuestionDoc {
  questionType: QuestionTypes;
  skips?: Array<QuestionSkipConfig>;
  property: string;
  dataType: string;
  entity?: object;
}

class Question {
  private _question: QuestionDoc;
  private _form: Form | undefined;

  constructor(question: QuestionDoc, form?: Form) {
    this._question = question;
    this._form = form;
  }

  get skips(): Array<QuestionSkipConfig> {
    if (!this._question.skips) {
      return [];
    }

    return this._question.skips;
  }

  setForm(form: Form) {
    this._form = form;
  }

  setValue() {
    if (!this._form) {
      throw new Error("MustSetQuestionForm");
    }

    return this._form.set(this._question.property);
  }

  get value() {
    if (!this._form) {
      throw new Error("MustSetQuestionForm");
    }

    return this._form.get(this._question.property);
  }

  get dataType() {
    return this._question.dataType;
  }
}

export default Question;
