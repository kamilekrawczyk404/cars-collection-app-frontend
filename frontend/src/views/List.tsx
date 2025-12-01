import Section from "../components/Section";
import Search from "../components/Search";
import NavigateTo from "../components/NavigateTo";
import { views } from "../App";
import { Plus } from "lucide-react";
import CarsTable from "../components/CarsTable";
import { useCarsList } from "../features/cars/queries";
import {
  ChangeEvent,
  ChangeEventHandler,
  useEffect,
  useMemo,
  useState,
} from "react";

const List = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { data, isLoading, isError, error } = useCarsList();

  const handleSearchQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredCars = useMemo(() => {
    if (!data?.value) return [];

    return data.value
      .filter((car) =>
        `${car.brand} ${car.model} ${car.id}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase()),
      )
      .reverse();
  }, [data, searchQuery]);

  return (
    <Section title={"Available cars"}>
      <div className={"flex gap-6 flex-col"}>
        {isLoading && (
          <p className={"p-2 rounded-md bg-indigo-700/10 text-indigo-800"}>
            Loading cars, please wait...
          </p>
        )}
        {isError && (
          <p>
            Error loading cars:{" "}
            <span className={"rounded-md p-2 text-red-600 bg-red-500/10 p-2"}>
              {String(error)}. Check if backend is running.
            </span>
          </p>
        )}

        {data && (
          <>
            <div
              className={
                "flex justify-between w-full gap-2 md:flex-row flex-col"
              }
            >
              <Search
                value={searchQuery}
                onChange={handleSearchQueryChange}
                className={"md:w-fit w-full"}
              />
              <NavigateTo to={views.Create.path} icon={<Plus />}>
                Add new one
              </NavigateTo>
            </div>
            <CarsTable carsCollection={filteredCars} />
          </>
        )}
      </div>
    </Section>
  );
};

export default List;
