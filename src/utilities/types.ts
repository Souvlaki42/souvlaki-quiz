export type rawQuestion = {
    category: string,
    type: string,
    difficulty: string,
    question: string,
    correct_answer: string,
    incorrect_answers: string[]
}

export type question = {
    question: string,
    choice1: string,
    choice2: string,
    choice3: string,
    choice4: string,
    answer: number,
}

export type highscore = {
    username: string,
    highscore: number,
    date: string
}