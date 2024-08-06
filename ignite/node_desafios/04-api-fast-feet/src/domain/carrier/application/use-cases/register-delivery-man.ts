import { Either, left, right } from "src/core/either";
import { DeliveryMan } from "../../enterprise/entities/delivery-man";
import { DeliveryManRepository } from "../repositories/delivery-man-repository";
import { HashGenerator } from "../cryptography/hashGenerator";
import { DeliveryManAlreadyExistsError } from "./errors/delivery-man-already-exists-error";

interface RegisterDeliveryManRequest {
  name: string;
  cpf: string;
  password: string;
}

type RegisterDeliveryManResponse = Either<
  DeliveryManAlreadyExistsError,
  { deliveryMan: DeliveryMan }
>;

export class RegisterDeliveryManUseCase {
  constructor(
    private deliveryManRepository: DeliveryManRepository,
    private hashGenerator: HashGenerator
  ) {}

  async execute({
    name,
    cpf,
    password,
  }: RegisterDeliveryManRequest): Promise<RegisterDeliveryManResponse> {
    const deliveryManWithSameCpf = await this.deliveryManRepository.findByCPF(
      cpf
    );

    if (deliveryManWithSameCpf) {
      return left(new DeliveryManAlreadyExistsError(cpf));
    }

    const hashedPassword = await this.hashGenerator.hash(password);

    const deliveryMan = DeliveryMan.create({
      name,
      cpf,
      password: hashedPassword,
    });

    await this.deliveryManRepository.create(deliveryMan);

    return right({ deliveryMan });
  }
}
