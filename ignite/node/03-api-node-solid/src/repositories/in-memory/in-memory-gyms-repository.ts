import { Gym, Prisma } from "@prisma/client";
import { FindManyNearbyParams, GymSRepository } from "../gyms-repository";
import { Decimal } from "@prisma/client/runtime/library";
import { randomUUID } from "node:crypto";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordinates";

export class InMemoryGymSRepository implements GymSRepository {
  public items: Gym[] = [];

  async findById(id: string): Promise<Gym | null> {
    const gym = this.items.find((item) => item.id === id);

    if (!gym) {
      return null;
    }

    return gym;
  }

  async createGym(data: Prisma.GymCreateInput) {
    const gym = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
    };

    this.items.push(gym);

    return gym;
  }

  async searchMany(query: string, page: number) {
    return this.items
      .filter((item) => item.title.includes(query))
      .slice((page - 1) * 20, page * 20);
  }

  async findManyNearby(params: FindManyNearbyParams) {
    return this.items.filter((item) => {
      const distance = getDistanceBetweenCoordinates(
        { latitude: params.latitude, longitude: params.longitude },
        {
          latitude: Number(item.latitude),
          longitude: Number(item.longitude),
        }
      );

      return distance < 10;
    });
  }
}
