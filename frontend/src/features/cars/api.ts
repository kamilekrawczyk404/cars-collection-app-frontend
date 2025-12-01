import { ApiResponse, Car, CreateCarDto } from "./types";
import axios from "axios";

const BASE_URL = "http://localhost:5105/api/cars";

export const getCars = async (): Promise<ApiResponse<Car[]>> => {
  const { data } = await axios.get(BASE_URL);
  return data;
};

export const getCar = async (id: string): Promise<ApiResponse<Car>> => {
  const { data } = await axios.get(`${BASE_URL}/${id}`);
  return data;
};

export const createCar = async (newCar: CreateCarDto): Promise<Car> => {
  const { data } = await axios.post(BASE_URL, newCar);
  return data;
};

export const updateCar = async ({ id, ...updates }: Car): Promise<Car> => {
  const { data } = await axios.put(`${BASE_URL}/${id}`, updates);
  return data;
};

export const deleteCar = async (id: string): Promise<void> => {
  await axios.delete(`${BASE_URL}/${id}`);
};
