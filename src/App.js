import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Quiz from "./components/Quiz";
import Start from "./components/Start";
const BASE_URL = "https://opentdb.com/api.php?";

const App = () => {
  const [categories, setCategories] = useState([]);
  const [questionData, setQuestionData] = useState([]);

  const fetchQuestions = async (count, categoryId) => {
    const res = await fetch(`${BASE_URL}amount=${count}&category${categoryId}`);
    const data = await res.json();
    setQuestionData(data.results);
  };

  const fetchCategories = async () => {
    const res = await fetch("https://opentdb.com/api_category.php");
    const categories = await res.json();
    setCategories(categories.trivia_categories);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/start"
            element={
              <Start categories={categories} fetchQuestions={fetchQuestions} />
            }
          />
          <Route
            exact
            path="/quiz"
            element={<Quiz questionData={questionData} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
