// src/types.ts
export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Task {
  id: number;
  title: string;
  description: string,
  done: boolean;
}
