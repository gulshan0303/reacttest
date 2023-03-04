import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MathJax } from 'better-react-mathjax';
import "./Home.css"

const Home = () => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const questionIDs = [
        'AreaUnderTheCurve_901',
        'BinomialTheorem_901',
        'DifferentialCalculus2_901'
      ];

      const questionPromises = questionIDs.map(id => axios.get(`https://0h8nti4f08.execute-api.ap-northeast-1.amazonaws.com/getQuestionDetails/getquestiondetails?QuestionID=${id}`).then(response => response.data[0]));
      const questions = await Promise.all(questionPromises);
      setQuestions(questions);
    }
    fetchData();
  }, []);

  const handleNextQuestion = () => setQuestionIndex(index => index + 1);
  const handlePreviousQuestion = () => setQuestionIndex(index => index - 1);

  if (!questions.length) return <div className='loading'>Loading questions...</div>;

  const currentQuestion = questions[questionIndex];
  return (
    <div>
      <h1>{currentQuestion.ChapterID}</h1>
      <div className="questionBox">
        <MathJax>{currentQuestion.Question}</MathJax>
      </div>
      <div className="btn">
        <button disabled={!questionIndex} onClick={handlePreviousQuestion}>Previous question</button>
        <button disabled={questionIndex === questions.length - 1} onClick={handleNextQuestion}>Next question</button>
      </div>
    </div>
  );
};

export default Home;
