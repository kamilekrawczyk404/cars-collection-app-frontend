using Cars.Application;
using Cars.Domain;
using Cars.Infrastructure;
using FluentValidation;
using MediatR;

namespace CarsWebApplication.Cars;

public class Create
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
            if (request.Car.Id == Guid.Empty)
                request.Car.Id = Guid.NewGuid();

            await _context.Cars.AddAsync(request.Car);

            var result = await _context.SaveChangesAsync() > 0;

            if (!result)
                return Result<Car>.Failure("Failed to create a new car");

            return Result<Car>.Success(request.Car);
        }
    }
}
