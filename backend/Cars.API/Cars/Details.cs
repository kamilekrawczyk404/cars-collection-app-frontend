using Cars.Application;
using Cars.Domain;
using Cars.Infrastructure;
using MediatR;
using Microsoft.AspNetCore.Http.HttpResults;

namespace CarsWebApplication.Cars;

public class Details
{
    public class Query : IRequest<Result<Car>>
    {
        public Guid Id { get; set; }
    }

    public class Handler : IRequestHandler<Query, Result<Car>>
    {
        private readonly DataContext _context;

        public Handler(DataContext context)
        {
            _context = context;
        }

        public async Task<Result<Car>> Handle(Query request, CancellationToken cancellationToken)
        {
            var foundCar = await _context.Cars.FindAsync(request.Id);

            if (foundCar == null)
                return Result<Car>.Failure("Failed to get a car. Car doesn't exist.");

            return Result<Car>.Success(foundCar);
        }
    }
}
