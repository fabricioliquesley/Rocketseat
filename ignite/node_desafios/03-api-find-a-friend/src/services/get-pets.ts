import { PetsRepository } from "@/repositories/pets-repository";
import { Pet } from "@prisma/client";
import { PetNotFoundError } from "./erros/pet-not-found-error";
import { fetchWordsInText } from "@/utils/function";

interface GetPetsServiceProps {
  city: string;
  searchDescription?: string | undefined | null;
}

interface faceGetPetsServiceResponse {
  pets: Pet[];
}

export class GetPetsService {
  constructor(private petsRepository: PetsRepository) {}

  async executeGetPets({
    city,
    searchDescription,
  }: GetPetsServiceProps): Promise<faceGetPetsServiceResponse> {
    let pets = await this.petsRepository.findPets(city);

    if (!pets) throw new PetNotFoundError();

    if (searchDescription) {
      const keysWords = searchDescription.split(/\W+/);

      pets = pets.filter(pet => fetchWordsInText(pet.details, keysWords));
    }
    console.log(pets);

    return { pets };
  }
}
