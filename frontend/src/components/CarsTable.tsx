import React, { ComponentProps, useCallback, useMemo } from "react";
import { BodyType, Car, FuelType } from "../features/cars/types";
import { Edit, Edit2, Edit3, SquarePen, Trash2 } from "lucide-react";
import { Link, LinkProps } from "react-router-dom";
import { useModal } from "../context/modals/Modal";
import { useDeleteCar } from "../features/cars/queries";

type CarsTableProps = {
  carsCollection: Car[];
};

type HeaderKey = keyof Car | "actions" | "#";
type Header = {
  title: string;
  key: HeaderKey;
};

const CarsTable = ({ carsCollection }: CarsTableProps) => {
  const tableHeaders: Header[] = [
    { title: "#", key: "#" },
    { title: "Id", key: "id" },
    { title: "Brand", key: "brand" },
    { title: "Model", key: "model" },
    { title: "Body type", key: "bodyType" },
    { title: "Fuel type", key: "fuelType" },
    { title: "Production date", key: "productionDate" },
    { title: "Actions", key: "actions" },
  ];

  const formattedRows = useMemo(() => {
    return carsCollection.map((car) => ({
      ...car,
      productionDate: new Intl.DateTimeFormat("pl-PL").format(
        new Date(car.productionDate),
      ),
    }));
  }, [carsCollection]);

  const renderCell = useCallback(
    (car: Car, headerKey: HeaderKey, index: number) => {
      if (headerKey === "#") {
        return (index + 1).toString();
      }
      if (headerKey === "bodyType") {
        return <BodyTypeTableElement bodyType={car.bodyType} />;
      }
      if (headerKey === "actions") {
        return <CarActions car={car} />;
      }
      if (headerKey === "fuelType") {
        return <FuelTypeTableElement fuelType={car.fuelType} />;
      }
      return car[headerKey as keyof Car];
    },
    [],
  );

  return (
    <div className={"overflow-x-auto w-full"}>
      <table className={"w-full"}>
        <thead>
          <tr>
            {tableHeaders.map((header) => (
              <th
                key={header.key}
                className={`bg-slate-100 text-nowrap tracking-tight font-[400] py-3 text-gray-700 first-of-type:rounded-tl-xl first-of-type:rounded-bl-xl last-of-type:rounded-tr-xl last-of-type:rounded-br-xl px-4 text-left ${
                  header.title === "Id" ? "w-64 max-w-72" : ""
                }`}
              >
                {header.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {formattedRows.length ? (
            formattedRows.map((car, carIndex) => (
              <tr key={car.id}>
                {tableHeaders.map((header, index) => (
                  <td
                    key={`${car.id}-cell-${index}`}
                    className={
                      "p-4 text-gray-900 border-b-[1px] border-slate-200"
                    }
                  >
                    {renderCell(car, header.key, carIndex)}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={tableHeaders.length} className={"p-4"}>
                Cannot find car with provided criteria.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

const unknownCellParams = {
  styling: "bg-gray-50 text-gray-400 border-gray-100",
  title: "Unknown",
};

const BodyTypeTableElement = ({ bodyType }: { bodyType: BodyType }) => {
  let bodyTypeParams: { styling: string; title: string };

  switch (bodyType) {
    case BodyType.Sedan:
      bodyTypeParams = {
        styling: "bg-blue-100 text-blue-800 border-blue-200",
        title: "Sedan",
      };
      break;
    case BodyType.Suv:
      bodyTypeParams = {
        styling: "bg-green-100 text-green-800 border-green-200",
        title: "SUV",
      };
      break;
    case BodyType.Hatchback:
      bodyTypeParams = {
        styling: "bg-yellow-100 text-yellow-800 border-yellow-200",
        title: "Hatchback",
      };
      break;
    case BodyType.Kombi:
      bodyTypeParams = {
        styling: "bg-purple-100 text-purple-800 border-purple-200",
        title: "Kombi",
      };
      break;
    case BodyType.Roadster:
      bodyTypeParams = {
        styling: "bg-red-100 text-red-800 border-red-200",
        title: "Roadster",
      };
      break;
    default:
      bodyTypeParams = unknownCellParams;
      break;
  }

  return (
    <div
      className={`rounded-md border-[1px] w-fit px-2 h-7 place-content-center  ${bodyTypeParams.styling}`}
    >
      {bodyTypeParams.title}
    </div>
  );
};

const FuelTypeTableElement = ({ fuelType }: { fuelType: FuelType }) => {
  let fuelTypeParams: { styling: string; title: string };

  switch (fuelType) {
    case FuelType.Petrol:
      fuelTypeParams = {
        styling: "bg-orange-100 text-orange-800 border-orange-200",
        title: "Petrol",
      };
      break;
    case FuelType.Diesel:
      fuelTypeParams = {
        styling: "bg-gray-100 text-gray-800  border-gray-200",
        title: "Diesel",
      };
      break;
    case FuelType.Hybrid:
      fuelTypeParams = {
        styling: "bg-green-100 text-green-800 border-green-200",
        title: "Hybrid",
      };
      break;
    case FuelType.LPG:
      fuelTypeParams = {
        styling: "bg-purple-100 text-purple-800 border-purple-200",
        title: "LPG",
      };
      break;
    default:
      fuelTypeParams = unknownCellParams;
      break;
  }

  return (
    <div
      className={`rounded-md border-[1px] w-fit px-2 h-7 place-content-center ${fuelTypeParams.styling}`}
    >
      {fuelTypeParams.title}
    </div>
  );
};

const ActionButton = ({ children, onClick }: ComponentProps<"button">) => {
  return (
    <button
      onClick={onClick}
      className={
        "text-gray-500 hover:bg-gray-100 p-1 rounded-md border-[1px] border-transparent hover:border-gray-200 transition"
      }
      type={"button"}
    >
      {children}
    </button>
  );
};

const LinkButton = ({ to, children }: LinkProps) => {
  return (
    <Link
      to={to}
      className={
        "text-gray-500 hover:bg-gray-100 p-1 rounded-md border-[1px] border-transparent hover:border-gray-200 transition"
      }
    >
      {children}
    </Link>
  );
};
const CarActions = ({ car }: { car: Car }) => {
  const { openModal } = useModal();

  const deleteCarMutation = useDeleteCar();

  const openDeleteCarModal = () => {
    openModal({
      title: "Are you sure to delete this car?",
      description: "Once you delete it, you won't be able to undo changes",
      processButtonText: "Delete",
      type: "warning",
      onProcess: async () => await deleteCarMutation.mutateAsync(car.id),
    });
  };

  return (
    <div className={"inline-flex"}>
      <LinkButton to={`/update/${car.id}`}>
        <SquarePen size={"1.25rem"} />
      </LinkButton>
      <ActionButton onClick={() => openDeleteCarModal()}>
        <Trash2 size={"1.25rem"} />
      </ActionButton>
    </div>
  );
};

export default CarsTable;
