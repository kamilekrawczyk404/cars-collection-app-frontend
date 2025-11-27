import { z } from "zod";
import { BodyType, FuelType } from "./types";

export const bodyTypeValues = Object.keys(BodyType).filter((k) =>
  isNaN(Number(k)),
) as [string, ...string[]];

export const fuelTypeValues = Object.keys(FuelType).filter((k) =>
  isNaN(Number(k)),
) as [string, ...string[]];

export const carSchema = z.object({
  brand: z.string().nonempty("Brand is required"),
  model: z.string().nonempty("Model is required"),
  doorsNumber: z
    .number()
    .min(2, "Doors number must be at least 2")
    .max(5, "Doors number cannot exceed 5"),
  luggageCapacity: z
    .number()
    .min(100, "Luggage capacity must be at least 100 liters")
    .max(1000, "Luggage capacity cannot exceed 1000 liters"),
  engineCapacity: z
    .number()
    .min(500, "Engine capacity must be at least 500 cc")
    .max(8000, "Engine capacity cannot exceed 8000 cc"),
  fuelType: z.enum(fuelTypeValues, {
    errorMap: () => ({ message: "Fuel type is required" }),
  }),
  bodyType: z.enum(bodyTypeValues, {
    errorMap: () => ({ message: "Body type is required" }),
  }),
  productionDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
  carFuelConsumption: z
    .number()
    .min(1, "Fuel consumption must be at least 1 L/100km")
    .max(30, "Fuel consumption cannot exceed 30 L/100km"),
});

export type CarFormValues = z.infer<typeof carSchema>;
