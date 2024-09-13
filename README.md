# QuizApp Component

The `QuizApp` component is a React class component that implements a quiz application with features including a countdown timer, question display, and multiple-choice options. It fetches quiz data from an API and displays questions with shuffled answer options.

## Features

- **Countdown Timer**: Displays a countdown timer that updates every second. The timer is reset based on the `timeFrame` prop and stops when it reaches zero.
- **Question and Options**: Fetches quiz data from the Open Trivia Database API, displays questions, and shuffles answer options.
- **Score Tracking**: Tracks the user's score based on the selected options and displays a score chart when the quiz ends.
- **Responsive Design**: Adapts to different screen sizes with responsive styling.

## Installation

To use the `QuizApp` component, you need to have React and Chart.js installed in your project. You can install these dependencies via npm or yarn:

```bash
npm install react chart.js
