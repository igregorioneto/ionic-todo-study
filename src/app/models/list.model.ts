import { Task } from './task.model';

export class List {
  constructor(
    public title: string,
    public tasks: Task[]
  ) {

  }
}
