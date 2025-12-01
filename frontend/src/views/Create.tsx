import Section from "../components/Section";
import React from "react";
import { useNavigate } from "react-router-dom";
import { views } from "../App";
import { toast } from "react-hot-toast";
import CustomToast from "../components/CustomToast";
import CarForm from "../components/forms/CarForm";
import { SubmitHandler } from "react-hook-form";
import { CarFormValues } from "../features/cars/schemas";
import { BodyType, FuelType } from "../features/cars/types";
import { useCreateCar } from "../features/cars/queries";

const Create = () => {
  const navigate = useNavigate();

  const { mutateAsync } = useCreateCar();

  const onSubmit: SubmitHandler<CarFormValues> = async (data) => {
    // Replace FuelType and BodyType strings with their corresponding enum values
    const preparedCarData = {
      ...data,
      fuelType: FuelType[data.fuelType as keyof typeof FuelType],
      bodyType: BodyType[data.bodyType as keyof typeof BodyType],
      productionDate: new Date(data.productionDate).toISOString(),
    };

    await mutateAsync(preparedCarData, {
      onSuccess: () => {
        toast.custom((t) => (
          <CustomToast
            t={t}
            title={"Car has been added!"}
            message={`${data.brand} ${data.model} parked in the database`}
          />
        ));
        navigate(views.Home.path);
      },
      onError: (error) => {
        console.error("Error creating car:", error);
        toast.custom((t) => (
          <CustomToast
            t={t}
            title={"Failed with creating a new car"}
            message={`Check internet connection and whether the backend server is online`}
            type={"error"}
          />
        ));
      },
    });
  };

  return (
    <Section title={"Creating a new car"}>
      <CarForm onSubmit={onSubmit} />
    </Section>
  );
};

export default Create;
