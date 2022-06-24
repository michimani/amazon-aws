import React from "react";
import "./Questions.css";

type QuestionItemProps = {
  name: string;
  prefix: string;
  url: string;
  questionNumber: number;
  onAnswer: (b: boolean) => void;
};

const defaultButton = "#dddddd";
const collectButton = "#67f56e";
const wrongButton = "#f56767";

type QuestionItemState = {
  answered: boolean;
  amazon: string;
  aws: string;
  neither: string;
  collect: boolean;
};

class QuestionItem extends React.Component<
  QuestionItemProps,
  QuestionItemState
> {
  state: QuestionItemState = {
    answered: false,
    amazon: defaultButton,
    aws: defaultButton,
    neither: defaultButton,
    collect: false,
  };

  constructor(props: QuestionItemProps) {
    super(props);

    this.selectAmazon = this.selectAmazon.bind(this);
    this.selectAWS = this.selectAWS.bind(this);
    this.selectNeither = this.selectNeither.bind(this);
    this.selectAnswer = this.selectAnswer.bind(this);
    this.setColor = this.setColor.bind(this);
  }

  selectAmazon() {
    this.selectAnswer("Amazon");
  }

  selectAWS() {
    this.selectAnswer("AWS");
  }

  selectNeither() {
    this.selectAnswer("");
  }

  selectAnswer(answer: string) {
    this.setState({ answered: true });
    const isCollect = this.props.prefix === answer;
    this.props.onAnswer(isCollect);

    if (isCollect) {
      this.setState({ collect: true });
      this.setColor(answer, collectButton);
      return;
    }

    this.setColor(this.props.prefix, collectButton);
    this.setColor(answer, wrongButton);
  }

  setColor(target: string, color: string) {
    switch (target) {
      case "Amazon":
        this.setState({ amazon: color });
        break;

      case "AWS":
        this.setState({ aws: color });
        break;

      case "":
        this.setState({ neither: color });
        break;

      default:
        break;
    }
  }

  hideHintText(question: string): string {
    return question.replace(/\((AWS|Amazon) /g, "(");
  }

  render(): JSX.Element {
    return (
      <div className="question-item">
        <span className="question-num">第{this.props.questionNumber}問</span>
        <p className="question">{this.hideHintText(this.props.name)}</p>
        <div>
          <button
            className="ans-button"
            style={{ background: this.state.amazon }}
            disabled={this.state.answered}
            onClick={this.selectAmazon}
          >
            Amazon
          </button>
          <button
            className="ans-button"
            style={{ background: this.state.neither }}
            disabled={this.state.answered}
            onClick={this.selectNeither}
          >
            どちらでもない
          </button>
          <button
            className="ans-button"
            style={{ background: this.state.aws }}
            disabled={this.state.answered}
            onClick={this.selectAWS}
          >
            AWS
          </button>
        </div>
        {this.state.answered && this.state.collect && (
          <div>
            <p className="ans ok">
              ⭕ 正解
              <br />
              <b>
                「{this.props.prefix} {this.props.name}」
              </b>
            </p>
          </div>
        )}
        {this.state.answered && !this.state.collect && (
          <div>
            <p className="ans ng">❌ 不正解</p>
            <p>
              正解は{" "}
              <b>
                「{this.props.prefix} {this.props.name}」
              </b>
            </p>
          </div>
        )}
        {this.state.answered && (
          <p className="official-reference">
            公式ドキュメント: <a href={this.props.url}>{this.props.url}</a>
          </p>
        )}
        <hr />
      </div>
    );
  }
}

export default QuestionItem;
