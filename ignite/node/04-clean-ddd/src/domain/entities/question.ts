import { Slug } from "./value-objects/slug";
import { Entity } from "@/core/entities/entity";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Optional } from "@/core/types/optional";
import dayjs from "dayjs";

interface QuestionProps {
  bestAnswerId?: UniqueEntityId;
  authorId: UniqueEntityId;
  updatedAt?: Date;
  createdAt: Date;
  content: string;
  title: string;
  slug: Slug;
}

export class Question extends Entity<QuestionProps> {
  get bestAnswerId() {
    return this.props.bestAnswerId;
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

  get title() {
    return this.props.title;
  }

  get slug() {
    return this.props.slug;
  }

  get isNew(): boolean {
    return dayjs().diff(this.props.createdAt, "days") <= 3;
  }

  get excerpt() {
    return this.content.substring(0, 120).trimEnd().concat("...");
  }

  private changeUpdatedAt() {
    this.props.updatedAt = new Date();
  }

  set bestAnswerId(bestAnswerId: UniqueEntityId | undefined) {
    this.props.bestAnswerId = bestAnswerId;
    this.changeUpdatedAt();
  }

  set content(content: string) {
    this.props.content = content;
    this.changeUpdatedAt();
  }

  set title(title: string) {
    this.props.title = title;
    this.props.slug = Slug.createFromText(title);
  }

  static create(
    props: Optional<QuestionProps, "createdAt" | "slug">,
    id?: UniqueEntityId
  ) {
    const question = new Question(
      {
        ...props,
        slug: props.slug ?? Slug.createFromText(props.title),
        createdAt: new Date(),
      },
      id
    );

    return question;
  }
}
