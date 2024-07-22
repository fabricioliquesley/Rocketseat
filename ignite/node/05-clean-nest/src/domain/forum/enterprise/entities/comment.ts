import { AggregateRoot } from "@/core/entities/aggregate-root";
import { Entity } from "@/core/entities/entity";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

export interface CommentProps {
  authorId: UniqueEntityId;
  content: string;
  createdAt: Date;
  updatedAt?: Date | null;
}

export abstract class Comment<
  Props extends CommentProps
> extends AggregateRoot<Props> {
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

  private changeUpdatedAt() {
    this.props.updatedAt = new Date();
  }

  set content(content: string) {
    this.props.content = content;
    this.changeUpdatedAt();
  }
}
