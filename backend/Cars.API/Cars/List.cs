using System.Data;
using Cars.Application;
using Cars.Domain;
using Cars.Infrastructure;
using MediatR;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace CarsWebApplication.Cars;

public class List
{
    public class Query : IRequest<Result<List<Car>>>;

    public class Handler : IRequestHandler<Query, Result<List<Car>>>
    {
        private readonly DataContext _context;

        public Handler(DataContext context)
        {
            _context = context;
        }

        public async Task<Result<List<Car>>> Handle(
            Query request,
            CancellationToken cancellationToken
        )
        {
            var cars = await _context.Cars.ToListAsync();

            if (cars == null)
            {
                return Result<List<Car>>.Failure("Cannot get cars.");
            }

            return Result<List<Car>>.Success(cars);
        }
    }
}
