import { PetsRepository } from "@/repositories/pets-repository";
import { Pet } from "@prisma/client";
import { PetNotFoundError } from "./erros/pet-not-found-error";

interface GetPetsServiceProps {
  city: string;
}

interface faceGetPetsServiceResponse {
  pets: Pet[];
}

export class GetPetsService {
  constructor(private petsRepository: PetsRepository) {}

  async executeGetPets({
    city,
  }: GetPetsServiceProps): Promise<faceGetPetsServiceResponse> {
    const pets = await this.petsRepository.findPets(city);

    if (!pets) throw new PetNotFoundError();

    return { pets };
  }
}
