import { Entity } from "@/core/entities/entity";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Optional } from "@/core/types/optional";

export interface AnswerProps {
  questionId: UniqueEntityId;
  authorId: UniqueEntityId;
  updatedAt?: Date;
  createdAt: Date;
  content: string;
}

export class Answer extends Entity<AnswerProps> {
  get questionId() {
    return this.props.questionId;
  }

  get authorId() {
    return this.props.authorId;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get content() {
    return this.props.content;
  }

  get excerpt() {
    return this.content.substring(0, 120).trimEnd().concat("...");
  }

  private changeUpdatedAt() {
    this.props.updatedAt = new Date();
  }

  set content(content: string) {
    this.props.content = content;
    this.changeUpdatedAt();
  }

  static create(
    props: Optional<AnswerProps, "createdAt">,
    id?: UniqueEntityId
  ) {
    const answer = new Answer(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id
    );

    return answer;
  }
}
