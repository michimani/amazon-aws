import "./Questions.css";

const React = require("react");

const defaultButton = "#dddddd";
const collectButton = "#67f56e";
const wrongButton = "#f56767";

class QuestionItem extends React.Component {
  constructor(props) {
    super(props);

    this.question = props.name;
    this.answer = props.prefix;
    this.url = props.url;
    this.qnum = props.qnum;
    this.state = {
      answered: false,
      amazon: defaultButton,
      aws: defaultButton,
      neither: defaultButton,
    };

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

  selectAnswer(answer) {
    this.setState({ answered: true });
    const isCollect = this.answer === answer;
    this.props.onAnswer(isCollect);

    if (isCollect) {
      this.collect = true;
      this.setColor(answer, collectButton);
      return;
    }

    this.setColor(this.answer, collectButton);
    this.setColor(answer, wrongButton);
  }

  setColor(target, color) {
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

  hideHintText(question) {
    return question.replace(/\((AWS|Amazon) /g, "(");
  }

  render() {
    return (
      <div className="question-item">
        <span className="question-num">第{this.qnum}問</span>
        <p className="question">{this.hideHintText(this.question)}</p>
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
        {this.state.answered && this.collect && (
          <div>
            <p className="ans ok">⭕ 正解</p>
          </div>
        )}
        {this.state.answered && !this.collect && (
          <div>
            <p className="ans ng">❌ 不正解</p>
            <p>
              正解は{" "}
              <b>
                「{this.answer} {this.question}」
              </b>
            </p>
          </div>
        )}
        {this.state.answered && (
          <p className="official-reference">
            公式ドキュメント: <a href={this.url}>{this.url}</a>
          </p>
        )}
        <hr />
      </div>
    );
  }
}

export default QuestionItem;
