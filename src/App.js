import "./App.css";
import Search from "./Search.js";

function App() {
  return (
    <div className="App">
      <Search />
      <div class="col-9 github-div">
        <a
          href="https://github.com/Ordrwams/shecodes-education.git"
          target="_blank"
          class="github"
        >
          Open-source code
        </a>
        <small class="name">by Anzhelika Maksimova</small>
      </div>
    </div>
  );
}

export default App;
