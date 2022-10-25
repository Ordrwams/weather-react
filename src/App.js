import "./App.css";
import Search from "./Search.js";

function App() {
  return (
    <div className="App">
      <Search />
      <div className="col-9 github-div">
        <a
          href="https://github.com/Ordrwams/shecodes-education.git"
          target="_blank"
          className="github"
        >
          Open-source code
        </a>
        <small className="name">by Anzhelika Maksimova</small>
      </div>
    </div>
  );
}

export default App;
