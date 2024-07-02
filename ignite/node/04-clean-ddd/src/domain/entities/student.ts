import { randomUUID } from "node:crypto";

interface StudentProps {
  name: string;
}

export class Student {
  public id: string;
  public name: string;

  constructor({ name }: StudentProps, id?: string) {
    this.name = name;
    this.id = id ?? randomUUID();
  }
}
