import { PaginationParams } from "@/core/repositories/pagination-params";
import {
  FindManyNearbyParams,
  PackageRepository,
} from "@/domain/carrier/application/repositories/package-repository";
import { Package } from "@/domain/carrier/enterprise/entities/package";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordinates";

export class InMemoryPackageRepository implements PackageRepository {
  public items: Package[] = [];

  async findById(id: string): Promise<Package> {
    const _package = this.items.find((item) => item.id.toString() === id);

    return _package;
  }

  async findManyByDeliveryManId(
    deliveryManId: string,
    { page }: PaginationParams
  ): Promise<Package[]> {
    const packages = this.items
      .filter((item) => {
        return (
          item.deliveryManId.toString() === deliveryManId &&
          item.situation === "delivered"
        );
      })
      .slice((page - 1) * 20, page * 20);

    return packages;
  }

  async findManyNearby(
    { deliveryManId, latitude, longitude }: FindManyNearbyParams,
    { page }: PaginationParams
  ): Promise<Package[]> {
    const packages = this.items
      .filter((item) => {
        const distance = getDistanceBetweenCoordinates(
          { latitude, longitude },
          { latitude: Number(item.latitude), longitude: Number(item.longitude) }
        );

        return distance < 20 && item.deliveryManId.toString() === deliveryManId;
      })
      .slice((page - 1) * 20, page * 20);

    if (!packages) return null;

    return packages;
  }

  async create(_package: Package): Promise<void> {
    this.items.push(_package);
  }

  async delete(_package: Package): Promise<void> {
    const index = this.items.findIndex((item) => item.id.equals(_package.id));

    this.items.splice(index, 1);
  }

  async save(_package: Package): Promise<void> {
    const index = this.items.findIndex((item) => item.id.equals(_package.id));

    this.items[index] = _package;
  }
}
