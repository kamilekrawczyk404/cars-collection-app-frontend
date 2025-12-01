using Cars.Application;
using Cars.Domain;
using Cars.Infrastructure;
using FluentValidation;
using MediatR;

namespace CarsWebApplication.Cars;

public class Edit
{
    public class Command : IRequest<Result<Car>>
    {
        public required Car Car { get; set; }
    }

    public class CommandValidator : AbstractValidator<Command>
    {
        public CommandValidator()
        {
            RuleFor(x => x.Car).SetValidator(new CarValidator());
        }
    }

    public class Handler : IRequestHandler<Command, Result<Car>>
    {
        private readonly DataContext _context;

        public Handler(DataContext context)
        {
            _context = context;
        }

        public async Task<Result<Car>> Handle(Command request, CancellationToken cancellationToken)
        {
            var existingCar = await _context.Cars.FindAsync(request.Car.Id);

            if (existingCar == null)
            {
                return Result<Car>.Failure("Failed to update the car. The car doesn't exist.");
            }

            existingCar.Brand = request.Car?.Brand ?? existingCar.Brand;
            existingCar.Model = request.Car?.Model ?? existingCar.Model;
            existingCar.BodyType = request.Car?.BodyType ?? existingCar.BodyType;
            existingCar.FuelType = request.Car?.FuelType ?? existingCar.FuelType;
            existingCar.CarFuelConsumption =
                request.Car?.CarFuelConsumption ?? existingCar.CarFuelConsumption;
            existingCar.LuggageCapacity =
                request.Car?.LuggageCapacity ?? existingCar.LuggageCapacity;
            existingCar.DoorsNumber = request.Car?.DoorsNumber ?? existingCar.DoorsNumber;
            existingCar.EngineCapacity = request.Car?.EngineCapacity ?? existingCar.EngineCapacity;
            existingCar.ProductionDate = request.Car?.ProductionDate ?? existingCar.ProductionDate;

            var result = await _context.SaveChangesAsync() > 0;

            if (!result)
            {
                return Result<Car>.Failure("Failed to updated car.");
            }

            return Result<Car>.Success(existingCar);
        }
    }
}
