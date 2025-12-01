using Cars.Domain;
using Microsoft.EntityFrameworkCore;

namespace Cars.Infrastructure;

public class Seed
{
    public static async Task SeedData(DataContext context)
    {
        if (await context.Cars.AnyAsync())
            return;

        var cars = new List<Car>
        {
            new Car
            {
                Id = Guid.NewGuid(),
                Brand = "Volkswagen",
                Model = "Golf",
                DoorsNumber = 5,
                LuggageCapacity = 380,
                EngineCapacity = 1498,
                FuelType = FuelType.Petrol,
                BodyType = BodyType.Hatchback,
                ProductionDate = new DateTime(2022, 5, 10),
                CarFuelConsumption = 5.8, // L/100km
            },
            new Car
            {
                Id = Guid.NewGuid(),
                Brand = "Audi",
                Model = "A4",
                DoorsNumber = 5,
                LuggageCapacity = 495,
                EngineCapacity = 1968,
                FuelType = FuelType.Diesel,
                BodyType = BodyType.Kombi,
                ProductionDate = new DateTime(2021, 11, 20),
                CarFuelConsumption = 5.1,
            },
            new Car
            {
                Id = Guid.NewGuid(),
                Brand = "Toyota",
                Model = "RAV4",
                DoorsNumber = 5,
                LuggageCapacity = 580,
                EngineCapacity = 2487,
                FuelType = FuelType.Hybrid,
                BodyType = BodyType.Suv,
                ProductionDate = new DateTime(2023, 1, 15),
                CarFuelConsumption = 4.5,
            },
            new Car
            {
                Id = Guid.NewGuid(),
                Brand = "BMW",
                Model = "Seria 3",
                DoorsNumber = 4,
                LuggageCapacity = 480,
                EngineCapacity = 1998,
                FuelType = FuelType.Petrol,
                BodyType = BodyType.Sedan,
                ProductionDate = new DateTime(2022, 8, 30),
                CarFuelConsumption = 7.2,
            },
            new Car
            {
                Brand = "Mazda",
                Model = "MX-5",
                DoorsNumber = 2,
                LuggageCapacity = 130,
                EngineCapacity = 1998,
                FuelType = FuelType.Petrol,
                BodyType = BodyType.Roadster,
                ProductionDate = new DateTime(2020, 3, 5),
                CarFuelConsumption = 6.9,
            },
            new Car
            {
                Brand = "Dacia",
                Model = "Duster",
                DoorsNumber = 5,
                LuggageCapacity = 445,
                EngineCapacity = 999,
                FuelType = FuelType.LPG,
                BodyType = BodyType.Suv,
                ProductionDate = new DateTime(2023, 4, 12),
                CarFuelConsumption = 7.8,
            },
        };

        Console.WriteLine("Seeding the database...");
        foreach (var car in cars)
        {
            await context.Cars.AddAsync(car);
        }
        await context.SaveChangesAsync();

        int carsCount = await context.Cars.CountAsync();
        Console.WriteLine("Seeding has been completed. Current count of cars: ", carsCount);
    }
}
