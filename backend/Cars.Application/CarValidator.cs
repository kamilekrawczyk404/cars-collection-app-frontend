using Cars.Domain;
using FluentValidation;

namespace Cars.Application;

public class CarValidator : AbstractValidator<Car>
{
    public CarValidator()
    {
        RuleFor(x => x.Brand).NotEmpty().WithMessage("Brand is required");
        RuleFor(x => x.Model).NotEmpty().WithMessage("Model is required");
        RuleFor(x => x.DoorsNumber)
            .InclusiveBetween(2, 10)
            .NotEmpty()
            .WithMessage("DoorsNumber is required and must be between 2 and 10");
        RuleFor(x => x.LuggageCapacity).NotEmpty().WithMessage("LuggageCapacity is required");
        RuleFor(x => x.EngineCapacity)
            .GreaterThan(0)
            .NotEmpty()
            .WithMessage("EngineCapacity is required");
        RuleFor(x => x.BodyType).IsInEnum().WithMessage("BodyType is required");
        RuleFor(x => x.ProductionDate).NotEmpty().WithMessage("ProductionDate is required");
        RuleFor(x => x.FuelType).IsInEnum().WithMessage("FuelType is required");
        RuleFor(x => x.CarFuelConsumption)
            .GreaterThan(0)
            .NotEmpty()
            .WithMessage("FuelConsumption is required");
    }
}
