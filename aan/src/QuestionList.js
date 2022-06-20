import QuestionData from "./data/amazon-aws.json";
import QuestionItem from "./QuestionItem";
import "./Questions.css";

const React = require("react");

const questionNumber = 10;

class QuestionList extends React.Component {
  constructor(props) {
    super(props);

    // ランダムで 10 問
    const total = QuestionData.length;
    const questionList = [];
    let selected = {};
    while (questionList.length < questionNumber) {
      const idx = Math.floor(Math.random() * total) + 1;
      if (selected[idx]) {
        continue;
      }

      questionList.push(QuestionData[idx]);
      selected[idx] = true;
    }
    this.data = questionList;

    this.state = { answered: 0, collect: 0 };

    this.onAnswer = this.onAnswer.bind(this);
    this.tweet = this.tweet.bind(this);
  }

  onAnswer(isCollect) {
    const currentAnswered = this.state.answered;
    this.setState({ answered: currentAnswered + 1 });

    if (isCollect) {
      const currentCollect = this.state.collect;
      this.setState({ collect: currentCollect + 1 });
    }
  }

  tweet() {
    const messageTmp = `Amazon or AWS クイズ\n${questionNumber}問中 ${this.state.collect} 問正解でした。\n#quiz_amazon_aws`;
    const message = encodeURIComponent(messageTmp);
    const tweetURL = `http://twitter.com/intent/tweet?url=https%3a%2f%2fmichimani%2enet%2fapp%2famazon-aws%2f&text=${message}`;
    window.open(tweetURL, "");
  }

  render() {
    return (
      <div>
        {this.data.map((d, idx) => (
          <QuestionItem
            prefix={d.prefix}
            name={d.name}
            url={d.url}
            key={idx}
            qnum={idx + 1}
            onAnswer={this.onAnswer}
          />
        ))}

        {this.state.answered === questionNumber && (
          <div>
            <h3>結果</h3>
            <p className="result">
              {questionNumber}問中 {this.state.collect} 問正解です。
            </p>
            <p>
              <button onClick={this.tweet} className="tweet-btn">
                結果をツイートする
              </button>
              <br />
              <a href="/app/amazon-aws/">もう一度</a>
            </p>
            <p>
              このクイズは AWS
              公式ドキュメントの一覧ページをもとに作成しています。
              <br />
              <a href="https://docs.aws.amazon.com/">
                https://docs.aws.amazon.com/
              </a>
            </p>
          </div>
        )}
      </div>
    );
  }
}

export default QuestionList;
