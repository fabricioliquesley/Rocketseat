import { randomUUID } from "crypto";

type bodySchema = {
  table?: string;
  data: {
    id?: string;
    name?: string;
    email: string;
    password: string;
  };
};

type repositorySchema = {
  createUser({ table, data }: bodySchema): void;
  getUser({ table, data }: bodySchema): object;
};

interface Services {
  createUser({ data }: bodySchema): void;
  createSession({ data }: bodySchema): object;
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

  async createSession({ data }: bodySchema): Promise<object> {
    const { email, password } = data;

    const userSession = await this.#userRepository.getUser({
      table: "users",
      data: {
        email,
        password,
      },
    });

    return userSession;
  }
}
