import logo from "./logo.png";
import "./App.css";
import QuestionList from "./Questions";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>"Amazon" or "AWS" ?</h2>
        <p className="description">
          AWS のサービス・ツール名のプレフィックスとして <b>"Amazon"</b> または{" "}
          <b>"AWS"</b> のどちらが正しいかを当てるクイズです。
          <br />
          200 を超えるサービス・ツールの中からランダムで 10 問出題されます。
        </p>
      </header>
      <hr />

      <QuestionList />
    </div>
  );
}

export default App;
