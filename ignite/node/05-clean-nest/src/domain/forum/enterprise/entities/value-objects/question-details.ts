import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { ValueObject } from "@/core/entities/value-object";
import { Attachment } from "../attachment";
import { Slug } from "./slug";

type Author = {
  id: UniqueEntityId;
  name: string;
};

export interface QuestionDetailsProps {
  questionId: UniqueEntityId;
  title: string;
  slug: Slug;
  content: string;
  bestAnswerId?: UniqueEntityId | null;
  author: Author;
  attachments: Attachment[];
  createdAt: Date;
  updatedAt?: Date | null;
}

export class QuestionDetails extends ValueObject<QuestionDetailsProps> {
  get questionId() {
    return this.props.questionId;
  }

  get title() {
    return this.props.title;
  }

  get slug() {
    return this.props.slug;
  }

  get content() {
    return this.props.content;
  }

  get bestAnswerId() {
    return this.props.bestAnswerId;
  }

  get author() {
    return this.props.author;
  }

  get attachments() {
    return this.props.attachments;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  static create(props: QuestionDetailsProps) {
    return new QuestionDetails(props);
  }
}