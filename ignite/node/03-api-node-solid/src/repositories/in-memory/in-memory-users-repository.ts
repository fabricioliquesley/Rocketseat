import { Prisma, User } from "@prisma/client";
import { userRepository } from "../users-repository";

export class InMemoryUserRepository implements userRepository {
  public items: User[] = [];

  async findByEmail(email: string): Promise<User | null> {
    const user = this.items.find(item => item.email === email);

    if (!user){
      return null
    }

    return user;
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    const user: User = {
      id: "user-1",
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date()
    }

    this.items.push(user);

    return user;
  }
}
