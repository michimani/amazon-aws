import QuestionData from './data/amazon-aws.json';
import './Questions.css';

const React = require('react');

const questionNumber = 10;

class QuestionList extends React.Component {
  constructor(props) {
    super(props);

    // ランダムで 10 問
    const total = QuestionData.length;
    const questionList = [];
    let selected = {};
    while (questionList.length < questionNumber) {
      const idx = Math.floor(Math.random() * total) + 1
      if (selected[idx]) {
        continue;
      }

      questionList.push(QuestionData[idx])
      selected[idx] = true;
    }
    this.data = questionList;

    this.state = {answered: 0, collect: 0}

    this.onAnswer = this.onAnswer.bind(this);
    this.tweet = this.tweet.bind(this);
  }

  onAnswer(isCollect) {
    const currentAnswered = this.state.answered;
    this.setState({answered: currentAnswered + 1})

    if (isCollect) {
      const currentCollect = this.state.collect;
      this.setState({collect: currentCollect + 1})
    }
  }

  tweet() {
    const messageTmp = `Amazon or AWS クイズ\n${questionNumber}問中 ${this.state.collect} 問正解でした。\n#quiz_amazon_aws`;
    const message = encodeURIComponent(messageTmp);
    const tweetURL = `http://twitter.com/intent/tweet?url=https%3a%2f%2fmichimani%2enet%2fapp%2famazon-aws%2f&text=${message}`;
    window.open(tweetURL, '');
  }

  render() {
    return (
      <div>
          {this.data.map((d, idx) =>
            <QuestionItem prefix={d.prefix} name={d.name} url={d.url} key={idx} qnum={idx+1} onAnswer={this.onAnswer} />
          )}

          {this.state.answered === questionNumber &&
            <div>
              <h3>結果</h3>
              <p className="result">
                {questionNumber}問中 {this.state.collect} 問正解です。
              </p>
              <p>
                <button
                  onClick={this.tweet}
                  className="tweet-btn"
                >結果をツイートする</button>
                <br/>
                <a href='/'>もう一度</a>
              </p>
              <p>
                このクイズは AWS 公式ドキュメントの一覧ページをもとに作成しています。<br/>
                <a href="https://docs.aws.amazon.com/">https://docs.aws.amazon.com/</a>
              </p>
            </div>
          }
      </div>
    );
  }
}

const defaultButton = '#dddddd'
const collectButton = '#67f56e'
const wrongButton = '#f56767'

class QuestionItem extends React.Component {
  constructor(props) {
    super(props)

    this.question = props.name;
    this.answer = props.prefix;
    this.url = props.url;
    this.qnum = props.qnum;
    this.state = {answered: false, amazon: defaultButton, aws: defaultButton, neither: defaultButton};

    this.selectAmazon = this.selectAmazon.bind(this)
    this.selectAWS = this.selectAWS.bind(this)
    this.selectNeither = this.selectNeither.bind(this)
    this.selectAnswer = this.selectAnswer.bind(this)
    this.setColor = this.setColor.bind(this)
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

    this.setState({answered: true});
    const isCollect = this.answer === answer
    this.props.onAnswer(isCollect);

    if (isCollect) {
      this.collect = true;
      this.setColor(answer, collectButton)
      return
    }

    this.setColor(this.answer, collectButton)
    this.setColor(answer, wrongButton)
  }

  setColor(target, color) {
    switch (target) {
      case 'Amazon':
        this.setState({amazon: color});
        break;

      case 'AWS':
        this.setState({aws: color});
        break;

      case '':
        this.setState({neither: color});
        break;

      default:
        break;
    }
  }

  render() {
    return (
      <div className="question-item">
        <span className="question-num">第{this.qnum}問</span>
        <p className="question">{this.question}</p>
        <div>
          <button className='ans-button' style={{background: this.state.amazon}} disabled={this.state.answered} onClick={this.selectAmazon}>Amazon</button>
          <button className='ans-button' style={{background: this.state.neither}} disabled={this.state.answered} onClick={this.selectNeither}>どちらでもない</button>
          <button className='ans-button' style={{background: this.state.aws}} disabled={this.state.answered} onClick={this.selectAWS}>AWS</button>
        </div>
        {this.state.answered && this.collect &&
            <div>
            <p className="ans ok">⭕ 正解</p>
            </div>
        }
        {this.state.answered && !this.collect &&
            <div>
            <p className="ans ng">❌ 不正解</p>
            <p>正解は <b>「{this.answer} {this.question}」</b></p>
            </div>
        }
        {this.state.answered &&
          <p className='official-reference'>
            公式ドキュメント: <a href={this.url}>{this.url}</a>
          </p>
        }
        <hr/>
      </div>
    );
  }
}

export default QuestionList;