import Section from "../components/Section";
import {
  bodyTypeValues,
  CarFormValues,
  carSchema,
  fuelTypeValues,
} from "../features/cars/schemas";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateCar } from "../features/cars/queries";
import { BodyType, FuelType } from "../features/cars/types";
import React, { ComponentProps, Ref } from "react";
import { useNavigate } from "react-router-dom";
import { views } from "../App";
import { toast } from "react-hot-toast";
import CustomToast from "../components/CustomToast";

const Create = () => {
  const navigate = useNavigate();
  const { mutate } = useCreateCar();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
    reset,
  } = useForm<CarFormValues>({
    resolver: zodResolver(carSchema),
    defaultValues: {
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

  const onSubmit: SubmitHandler<CarFormValues> = (data) => {
    // Replace FuelType and BodyType strings with their corresponding enum values
    const preparedCarData = {
      ...data,
      fuelType: FuelType[data.fuelType as keyof typeof FuelType],
      bodyType: BodyType[data.bodyType as keyof typeof BodyType],
      productionDate: new Date(data.productionDate).toISOString(),
    };

    mutate(preparedCarData, {
      onSuccess: () => {
        reset();
        toast.custom((t) => (
          <CustomToast
            t={t}
            title={"Car has been added!"}
            message={`${data.brand} ${data.model} parked in the database.`}
          />
        ));
        navigate(views.Home.path);
      },
      onError: (error) => {
        console.error("Error creating car:", error);
      },
    });
  };

  const currentValues = {
    fuelType: watch("fuelType"),
    bodyType: watch("bodyType"),
  };

  return (
    <Section title={"Creating a new car"}>
      <form onSubmit={handleSubmit(onSubmit)} className={"flex flex-col gap-4"}>
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
          className={`bg-accent text-gray-100 px-4 h-10 transition-all rounded-xl self-start disabled:bg-accent/50`}
        >
          Create car
        </button>
      </form>
    </Section>
  );
};

type CustomInputProps = ComponentProps<"input"> & {
  label: string;
  errorMessage?: string;
  ref?: Ref<HTMLInputElement>;
};

const CustomInput = ({
  ref,
  label,
  errorMessage,
  className,
  type = "text",
  ...props
}: CustomInputProps) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={props.name} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        ref={ref} // Tutaj ref trafia poprawnie
        type={type}
        id={props.name}
        className={`focus:outline-none h-10 px-3 rounded-lg border ${
          errorMessage ? "border-red-500" : "border-gray-300"
        }`}
        {...props}
      />
      {errorMessage && (
        <span className="text-red-500 text-xs">{errorMessage}</span>
      )}
    </div>
  );
};

type CustomSelectorProps = {
  label: string;
  options: string[];
  errorMessage?: string;
  onSelect: (value: string) => void;
  currentActive?: string;
};

const CustomSelector = ({
  label,
  options,
  errorMessage,
  onSelect,
  currentActive,
}: CustomSelectorProps) => {
  return (
    <div className={""}>
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <ul className={"flex flex-wrap gap-2"}>
        {options.map((option) => (
          <li
            key={option}
            onClick={() => onSelect(currentActive === option ? "" : option)}
            className={`rounded-md border-[1px] h-8 px-2 place-content-center cursor-pointer text-md transition-colors ${
              currentActive === option ? "border-accent bg-accent/10" : ""
            }`}
          >
            {option}
          </li>
        ))}
      </ul>
      {!!errorMessage && (
        <span className="text-red-500 text-xs">{errorMessage}</span>
      )}
    </div>
  );
};

type FormSectionProps = ComponentProps<"div"> & { childrenClassName?: string };

const FormSection = ({
  title,
  className,
  childrenClassName,
  children,
}: FormSectionProps) => {
  return (
    <div className={`bg-slate-100 p-4 rounded-lg space-y-2 ${className}`}>
      <h3 className={"text-xl"}>{title}</h3>
      <div className={childrenClassName}>{children}</div>
    </div>
  );
};
export default Create;
