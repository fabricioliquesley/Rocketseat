import { Gym, Prisma } from "@prisma/client";

export interface FindManyNearbyParams {
  latitude: number;
  longitude: number;
}

export interface GymSRepository {
  findById(gymId: string): Promise<Gym | null>;
  createGym(data: Prisma.GymCreateInput): Promise<Gym>;
  searchMany(query: string, page: number): Promise<Gym[]>;
  findManyNearby(params: FindManyNearbyParams): Promise<Gym[]>;
}
