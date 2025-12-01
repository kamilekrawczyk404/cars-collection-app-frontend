using Cars.Application;
using Cars.Domain;
using Cars.Infrastructure;
using MediatR;

namespace CarsWebApplication.Cars;

public class Delete
{
    public class Command : IRequest<Result<Unit>>
    {
        public required Guid Id { get; set; }
    }

    public class Handler : IRequestHandler<Command, Result<Unit>>
    {
        private readonly DataContext _context;

        public Handler(DataContext context)
        {
            _context = context;
        }

        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var carToDelete = await _context.Cars.FindAsync(request.Id);

            if (carToDelete == null)
                return Result<Unit>.Failure("Failed to delete car. Specified car doesn't exist.");

            _context.Cars.Remove(carToDelete);

            var result = await _context.SaveChangesAsync() > 0;

            if (!result)
            {
                return Result<Unit>.Failure("Failed to delete car.");
            }

            return Result<Unit>.Success(Unit.Value);
        }
    }
}
