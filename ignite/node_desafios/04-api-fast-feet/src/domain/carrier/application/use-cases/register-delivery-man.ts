import { Either, left, right } from "src/core/either";
import { DeliveryMan } from "../../enterprise/entities/delivery-man";
import { DeliveryManRepository } from "../repositories/delivery-man-repository";
import { HashGenerator } from "../cryptography/hashGenerator";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

interface RegisterDeliveryManUseCaseRequest {
  name: string;
  cpf: string;
  password: string;
}

type RegisterDeliveryManUseCaseResponse = Either<
  UserAlreadyExistsError,
  { deliveryman: DeliveryMan }
>;

export class RegisterDeliveryManUseCase {
  constructor(
    private deliverymanRepositoryRepository: DeliveryManRepository,
    private hashGenerator: HashGenerator
  ) {}

  async execute({
    name,
    cpf,
    password,
  }: RegisterDeliveryManUseCaseRequest): Promise<RegisterDeliveryManUseCaseResponse> {
    const deliverymanWithSameCpf =
      await this.deliverymanRepositoryRepository.findByCPF(cpf);

    if (deliverymanWithSameCpf) {
      return left(new UserAlreadyExistsError());
    }

    const hashedPassword = await this.hashGenerator.hash(password);

    const deliveryman = DeliveryMan.create({
      name,
      cpf,
      password: hashedPassword,
    });

    await this.deliverymanRepositoryRepository.create(deliveryman);

    return right({ deliveryman });
  }
}
