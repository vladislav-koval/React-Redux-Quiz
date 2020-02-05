import axios from "../../axios/axios-quiz";
import {FETCH_QUIZ_SUCCESS, FETCH_QUIZZES_ERROR, FETCH_QUIZZES_START, FETCH_QUIZZES_SUCCESS} from "./actionTypes";

export function fetchQuizzes() {
    return async dispatch => {
        dispatch(fetchQuizzesStart());
        try {
            const response = await axios.get('/quizes.json');
            console.log(response.data);
            const quizzes = [];

            Object.keys(response.data).forEach((key, index) => {
                quizzes.push({
                    id: key,
                    name: `Тест ${index + 1}`
                })
            });
            dispatch(fetchQuizzesSuccess(quizzes));
        } catch (e) {
            dispatch(fetchQuizzesError(e));
        }
    }
}

export function fetchQuizById(quizId) {
    return async dispatch => {
        dispatch(fetchQuizzesStart());
        try {
            const response = await axios.get(`/quizes/${quizId}.json`);
            const quiz = response.data;

            dispatch(fetchQuizSuccess(quiz))
        } catch (e) {
            dispatch(fetchQuizzesError(e));
        }
        // console.log('Quiz ID = ' + this.props.match.params.id)
    }
}

export function fetchQuizSuccess(quiz) {
    return {
        type: FETCH_QUIZ_SUCCESS,
        quiz: quiz,
    }
}

export function fetchQuizzesStart() {
    return {
        type:FETCH_QUIZZES_START,
    }
}

export function fetchQuizzesSuccess(quizzes) {
    return {
        type:FETCH_QUIZZES_SUCCESS,
        quizzes
    }
}

export function fetchQuizzesError(e) {
    return {
        type:FETCH_QUIZZES_ERROR,
        error: e
    }
}
