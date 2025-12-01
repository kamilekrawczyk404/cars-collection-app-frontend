import React from "react";
import {
  bodyTypeValues,
  CarFormValues,
  carSchema,
  fuelTypeValues,
} from "../../features/cars/schemas";
import FormSection from "./FormSection";
import CustomInput from "./CustomInput";
import CustomSelector from "./CustomSelector";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type CarFormProps = {
  defaultValues?: Partial<CarFormValues>;
  onSubmit: (data: CarFormValues) => void;
  submittingText?: string;
};

const CarForm = ({
  onSubmit,
  defaultValues,
  submittingText = "Create new car",
}: CarFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
  } = useForm<CarFormValues>({
    resolver: zodResolver(carSchema),
    defaultValues: defaultValues || {
      brand: "",
      model: "",
      productionDate: "",
      fuelType: "",
      bodyType: "",
      doorsNumber: 5,
      engineCapacity: 2478,
      luggageCapacity: 550,
      carFuelConsumption: 10.2,
    },
  });

  const currentValues = {
    fuelType: watch("fuelType"),
    bodyType: watch("bodyType"),
  };

  const handleFormSubmit: SubmitHandler<CarFormValues> = (data) => {
    onSubmit(data);
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className={"flex flex-col gap-4"}
    >
      <div className={"flex md:flex-row flex-col gap-2"}>
        <FormSection
          title={"Basic Information"}
          className={"basis-1/3"}
          childrenClassName={"flex flex-col gap-2 w-full"}
        >
          <CustomInput
            label={"Brand"}
            errorMessage={errors.brand?.message}
            {...register("brand")}
          />
          <CustomInput
            label={"Model"}
            errorMessage={errors.model?.message}
            {...register("model")}
          />
          <CustomInput
            label={"Production Date"}
            errorMessage={errors.productionDate?.message}
            type={"date"}
            {...register("productionDate")}
          />
        </FormSection>
        <FormSection
          title={"Specification"}
          className={"basis-2/3"}
          childrenClassName={"flex lg:flex-row flex-col md:gap-4 gap-2"}
        >
          <div className={"flex flex-col gap-1"}>
            <CustomSelector
              label={"Fuel Type"}
              options={fuelTypeValues}
              currentActive={currentValues.fuelType}
              errorMessage={errors.fuelType?.message}
              onSelect={(value) =>
                setValue("fuelType", value as string, {
                  shouldValidate: true,
                })
              }
            />
            <CustomSelector
              label={"Body Type"}
              options={bodyTypeValues}
              currentActive={currentValues.bodyType}
              errorMessage={errors.bodyType?.message}
              onSelect={(value) =>
                setValue("bodyType", value as string, {
                  shouldValidate: true,
                })
              }
            />
          </div>
          <div className={"grid sm:grid-cols-2 gap-2"}>
            <CustomInput
              label={"Doors Number"}
              type={"number"}
              errorMessage={errors.doorsNumber?.message}
              {...register("doorsNumber", { valueAsNumber: true })}
            />
            <CustomInput
              label={"Luggage Capacity (L)"}
              type={"number"}
              errorMessage={errors.luggageCapacity?.message}
              {...register("luggageCapacity", { valueAsNumber: true })}
            />
            <CustomInput
              label={"Engine Capacity (cc)"}
              type={"number"}
              errorMessage={errors.engineCapacity?.message}
              {...register("engineCapacity", { valueAsNumber: true })}
            />
            <CustomInput
              label={"Fuel Consumption (L/100km)"}
              type={"number"}
              step={0.1}
              errorMessage={errors.carFuelConsumption?.message}
              {...register("carFuelConsumption", { valueAsNumber: true })}
            />
          </div>
        </FormSection>
      </div>
      <button
        type={"submit"}
        disabled={isSubmitting}
        className={`bg-accent text-gray-100 px-4 h-10 transition-all rounded-md self-start disabled:bg-accent/50 md:w-fit w-full`}
      >
        {submittingText}
      </button>
    </form>
  );
};

export default CarForm;
