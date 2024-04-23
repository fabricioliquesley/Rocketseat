import { Prisma, User } from "@prisma/client";

export interface userRepository {
  findByEmail(email: string): Promise<User | null>
  createUser(data: Prisma.UserCreateInput): Promise<User>
}