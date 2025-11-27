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
        <div className={"flex justify-between w-full"}>
          <Search value={searchQuery} onChange={handleSearchQueryChange} />
          <NavigateTo to={views.Create.path} icon={<Plus />}>
            Add new one
          </NavigateTo>
        </div>

        {isLoading && <p>Loading cars, please wait...</p>}
        {isError && <p>Error loading cars: {String(error)}</p>}
        {data && <CarsTable carsCollection={filteredCars} />}
      </div>
    </Section>
  );
};

export default List;
