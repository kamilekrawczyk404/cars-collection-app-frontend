import Section from "../components/Section";
import { useNavigate, useParams } from "react-router-dom";
import { useCar, useUpdateCar } from "../features/cars/queries";
import NavigateTo from "../components/NavigateTo";
import { views } from "../App";
import { Home } from "lucide-react";
import { CarFormValues } from "../features/cars/schemas";
import { BodyType, Car, FuelType } from "../features/cars/types";
import CustomToast from "../components/CustomToast";
import { toast } from "react-hot-toast";
import React from "react";
import CarForm from "../components/forms/CarForm";

const Update = () => {
  const navigate = useNavigate();

  const { carId } = useParams();
  const { data: car, isLoading, isError } = useCar(carId ?? "");

  const mutation = useUpdateCar();

  if (isLoading)
    return (
      <Section>
        <p className={"p-2 rounded-md bg-indigo-800/10 text-indigo-800"}>
          Wait, we're getting information...
        </p>
      </Section>
    );

  const carData =
    car && typeof car === "object" && "value" in car ? car.value : car;

  if (isError || !carData)
    return (
      <Section title={"Updating car"}>
        <p className={"p-2 rounded-md bg-red-800/10 text-red-800"}>
          Car not found or error loading data.
        </p>
        <NavigateTo className={"mt-2"} to={views.Home.path}>
          Return to home
        </NavigateTo>
      </Section>
    );

  const initialValues: Partial<CarFormValues> = {
    brand: carData.brand,
    model: carData.model,
    productionDate: carData.productionDate.split("T")[0],
    fuelType: FuelType[carData.fuelType],
    bodyType: BodyType[carData.bodyType],
    doorsNumber: carData.doorsNumber,
    engineCapacity: carData.engineCapacity,
    luggageCapacity: carData.luggageCapacity,
    carFuelConsumption: carData.carFuelConsumption,
  };

  const onSuccessUpdate = (data: Car) => {
    toast.custom((t) => (
      <CustomToast
        t={t}
        title={"Car updated successfully"}
        message={`Your car ${data.brand} ${data.model} is now updated`}
      />
    ));
    navigate(views.Home.path);
  };

  const handleUpdate = async (data: CarFormValues) => {
    const apiPayload: Car = {
      id: carData.id,
      ...data,
      productionDate: new Date(data.productionDate).toISOString(),
      fuelType: FuelType[data.fuelType as keyof typeof FuelType],
      bodyType: BodyType[data.bodyType as keyof typeof BodyType],
    };

    // Check if some field has been changed, if no, return back to the home page
    // Backend will return 400 Bad Request, because of lack of changes, so we're omitting this
    if (
      Object.entries(apiPayload).every(([key, value]) => {
        if (key === "productionDate") {
          return (
            value ===
            new Date(carData.productionDate.split("T")[0]).toISOString()
          );
        }
        return carData[key as keyof CarFormValues] === value;
      })
    )
      return onSuccessUpdate(apiPayload);

    mutation.mutate(apiPayload, {
      onSuccess: onSuccessUpdate,
      onError: () => {
        toast.custom((t) => (
          <CustomToast
            t={t}
            title={"Updating car failed"}
            message={`Check internet connection and try again`}
            type={"error"}
          />
        ));
      },
    });
  };

  return (
    <Section title={`Updating car - #${carId}`}>
      <CarForm
        onSubmit={handleUpdate}
        defaultValues={initialValues}
        submittingText={"Update car"}
      />
    </Section>
  );
};

export default Update;
