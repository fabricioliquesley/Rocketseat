import { Gym, Prisma } from "@prisma/client";

export interface GymSRepository {
  findById(gymId: string): Promise<Gym | null>;
  createGym(data: Prisma.GymCreateInput): Promise<Gym>;
}
