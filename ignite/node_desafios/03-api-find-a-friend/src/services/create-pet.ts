import { PetsRepository } from "@/repositories/pets-repository";
import { $Enums, Pet } from "@prisma/client";

interface CreatePetServiceProps {
  category: string;
  gender: $Enums.Gender;
  details: string;
  orgId: string;
}

interface CreatePetServiceResponse {
  pet: Pet;
}

export class CreatePetService {
  constructor(private petRepository: PetsRepository) {}

  async executeCreate({
    category,
    gender,
    details,
    orgId,
  }: CreatePetServiceProps): Promise<CreatePetServiceResponse> {
    const pet = await this.petRepository.createPet({
      category,
      gender,
      details,
      orgId,
    });

    return { pet };
  }
}
