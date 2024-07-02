import { randomUUID } from "node:crypto";

interface InstructorProps {
  name: string;
}

export class Instructor {
  public id: string;
  public name: string;

  constructor({ name }: InstructorProps, id?: string) {
    this.name = name;
    this.id = id ?? randomUUID();
  }
}
