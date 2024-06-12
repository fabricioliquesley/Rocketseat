import { PetsRepository } from "@/repositories/pets-repository";
import { Pet } from "@prisma/client";
import { PetNotFoundError } from "./erros/pet-not-found-error";

interface GetPetDetailsServiceProps {
  id: string;
}

interface GetPetDetailsServiceResponse {
  pet: Pet;
}

export class GetPetDetailsService {
  constructor(private petRepository: PetsRepository) {}

  async executeGetPetDetails({
    id,
  }: GetPetDetailsServiceProps): Promise<GetPetDetailsServiceResponse> {
    const pet = await this.petRepository.findPetById(id);

    if (!pet) throw new PetNotFoundError()

    return { pet };
  }
}
