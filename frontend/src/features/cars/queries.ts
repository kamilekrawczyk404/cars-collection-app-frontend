import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createCar, deleteCar, getCar, getCars, updateCar } from "./api";
import { Car, CreateCarDto } from "./types";

export const carKeys = {
  all: ["cars"] as const,
  detail: (id: string) => [...carKeys.all, "detail", id] as const,
};

export const useCarsList = () => {
  return useQuery({
    queryFn: getCars,
    queryKey: carKeys.all,
  });
};

export const useCar = (id: string) => {
  return useQuery({
    queryFn: () => getCar(id),
    queryKey: carKeys.detail(id),
    enabled: !!id,
  });
};

export const useCreateCar = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: (newCar: CreateCarDto) => createCar(newCar),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: carKeys.all });
    },
  });
};

export const useUpdateCar = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: (updatedCar: Car) => updateCar(updatedCar),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: carKeys.all });
    },
  });
};

export const useDeleteCar = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteCar(id),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: carKeys.all });
    },
  });
};
