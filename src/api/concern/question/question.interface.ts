export interface qList {
  [key: string]: any;
}

export interface User {
  user_idx: string,
  nickname: string,
  gender: string,
  age: string,
}

export interface Question {
  title: string,
  question_idx: number,
  create_time: string
}

export interface Category {
  category_idx: number,
  category_name: String,
}

