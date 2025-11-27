export enum FuelType {
  Petrol = 0,
  Diesel = 1,
  Hybrid = 2,
  LPG = 3,
}

export enum BodyType {
  Hatchback = 0,
  Sedan = 1,
  Kombi = 2,
  Suv = 3,
  Roadster = 4,
}

export interface Car {
  id: string;
  brand: string;
  model: string;
  doorsNumber: number;
  luggageCapacity: number;
  engineCapacity: number;
  fuelType: FuelType;
  bodyType: BodyType;
  productionDate: string;
  carFuelConsumption: number;
}

export interface ApiResponse<T> {
  value: T;
  isSuccess: boolean;
  error: string | null;
}

export type CreateCarDto = Omit<Car, "id">;
