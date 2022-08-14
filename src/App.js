import { BrowserRouter, Route, Routes } from "react-router-dom";
import Quiz from "./components/Quiz";
import Start from "./components/Start";

const App = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Start />} />
          <Route exact path="/quiz" element={<Quiz />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
