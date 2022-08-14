import { configureStore } from "@reduxjs/toolkit";
import quizSlice from "./slices/quiz-slice";

export const store = configureStore({
  reducer: {
    quiz: quizSlice,
  },
});
