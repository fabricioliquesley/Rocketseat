import { PaginationParams } from "@/core/repositories/pagination-params";
import { Package } from "../../enterprise/entities/package";

export type FindManyNearbyParams = {
  deliveryManId: string;
  latitude: number;
  longitude: number;
};

export abstract class PackageRepository {
  abstract findById(id: string): Promise<null | Package>;
  abstract findManyByDeliveryManId(
    deliveryManId: string,
    params: PaginationParams
  ): Promise<Package[]>;
  abstract findManyNearby(
    params: FindManyNearbyParams,
    paginationParams: PaginationParams
  ): Promise<Package[] | null>;
  abstract create(_package: Package): Promise<void>;
  abstract delete(_package: Package): Promise<void>;
  abstract save(_package: Package): Promise<void>;
}
