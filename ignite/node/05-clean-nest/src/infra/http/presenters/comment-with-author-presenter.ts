import { CommentWithAuthor } from "@/domain/forum/enterprise/entities/value-objects/comment-with-author";

export class CommentWithAuthorPresenter {
  static toHTTP(commentWithAutor: CommentWithAuthor) {
    return {
      commentId: commentWithAutor.commentId.toString(),
      content: commentWithAutor.content,
      author: {
        id: commentWithAutor.authorId.toString(),
        name: commentWithAutor.authorName,
      },
      createdAt: commentWithAutor.createdAt,
      updatedAt: commentWithAutor.updatedAt,
    };
  }
}
