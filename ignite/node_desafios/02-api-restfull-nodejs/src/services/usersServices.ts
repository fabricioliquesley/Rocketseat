import { randomUUID } from "crypto";

type bodySchema = {
  table?: string;
  data: {
    id?: string;
    name: string;
    email: string;
    password: string;
  };
};

type repositorySchema = {
  createUser({ table, data }: bodySchema): void;
};

interface Services {
  createUser({ data }: bodySchema): void;
}

export class UserServices implements Services {
  #userRepository;

  constructor(userRepository: repositorySchema) {
    this.#userRepository = userRepository;
  }

  async createUser({ data }: bodySchema): Promise<void> {
    const { name, email, password } = data;

    await this.#userRepository.createUser({
      table: "users",
      data: {
        id: randomUUID(),
        name,
        email,
        password,
      },
    });

    return;
  }
}
