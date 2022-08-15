import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const BASE_URL = "https://opentdb.com/api.php?";

const initialState = {
  categories: [],
  questions: [],
  isDataFetched: false,
  questionNumber: 0,
  currentQuestion: {
    answers: [],
    selectedAnswer: null,
    status: null,
  },
  score: 0,
  isFinished: false,
};

export const fetchAsyncQuestions = createAsyncThunk(
  "questions/fetchAsyncQuestions",
  async ({ count, selectedCategory }) => {
    const res = await fetch(
      `${BASE_URL}amount=${count}&category=${selectedCategory}`
    );
    const data = await res.json();
    return data.results;
  }
);

export const fetchAsyncCategories = createAsyncThunk(
  "categories/fetchAsyncCategories",
  async () => {
    const res = await fetch("https://opentdb.com/api_category.php");
    const categories = await res.json();
    return categories.trivia_categories;
  }
);

export const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    onChangeQuestion: (state) => {
      state.currentQuestion = state.questions[state.questionNumber];
    },
    setSelectedAnswer: (state, { payload }) => {
      state.currentQuestion.selectedAnswer = payload;
    },
    next: (state) => {
      if (state.questionNumber + 1 < state.questions.length)
        state.questionNumber = state.questionNumber + 1;
    },
    prev: (state) => {
      if (state.questionNumber > 0)
        state.questionNumber = state.questionNumber - 1;
    },
    setQuestionNumber: (state, { payload }) => {
      state.questionNumber = payload;
    },
    check: (state) => {
      if (
        state.currentQuestion.correct_answer ===
        state.currentQuestion.selectedAnswer.option
      ) {
        state.score = state.score + 1;
        const updated = state.questions.map((item) => {
          if (item.id === state.currentQuestion.id)
            return {
              ...state.currentQuestion,
              checked: true,
              status: true,
              selectedAnswer: state.currentQuestion.selectedAnswer,
            };
          else return item;
        });
        state.questions = updated;
      } else {
        const updated = state.questions.map((item) => {
          if (item.id === state.currentQuestion.id)
            return {
              ...state.currentQuestion,
              checked: true,
              status: false,
              selectedAnswer: state.currentQuestion.selectedAnswer,
            };
          else return item;
        });
        state.questions = updated;
      }
    },
    setFinished: (state) => {
      state.isFinished = true;
    },
  },
  extraReducers: {
    [fetchAsyncCategories.pending]: () => {
      console.log("pending categories");
    },
    [fetchAsyncCategories.fulfilled]: (state, { payload }) => {
      state.categories = payload;
      console.log("fetched categories");
    },

    [fetchAsyncQuestions.pending]: () => {
      console.log("pending questionData");
    },
    [fetchAsyncQuestions.fulfilled]: (state, { payload }) => {
      const allQuestions = [
        ...payload.map((question) => ({
          ...question,
          answers: [
            ...question.incorrect_answers,
            question?.correct_answer,
          ].sort(() => Math.random() - 0.5),
          id: Math.random() * 99999999999,
          checked: false,
        })),
      ];
      state.questions = allQuestions;
      state.currentQuestion = {
        ...allQuestions[0],
      };
      state.isDataFetched = true;
      console.log("fetched questions");
    },
  },
});

export const {
  check,
  next,
  onChangeQuestion,
  prev,
  setSelectedAnswer,
  setFinished,
  setQuestionNumber,
} = quizSlice.actions;

export default quizSlice.reducer;
