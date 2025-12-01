using Cars.Domain;
using Cars.Infrastructure;
using CarsWebApplication.Cars;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Cars.Application;

public class CarsController : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<List<Car>>> GetCars()
    {
        var result = await Mediator.Send(new List.Query());

        if (result.IsSuccess)
            return Ok(result);

        return Problem(result.Error);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Car>> GetCar(Guid id)
    {
        var result = await Mediator.Send(new Details.Query { Id = id });

        if (result.IsSuccess)
            return Ok(result.Value);

        return BadRequest(result.Error);
    }

    [HttpPost]
    public async Task<IActionResult> AddCar(Car car)
    {
        var result = await Mediator.Send(new Create.Command { Car = car });

        if (result == null)
            return BadRequest();

        if (result.IsSuccess && result.Value != null)
            return CreatedAtAction(nameof(GetCar), new { id = result.Value.Id }, result.Value);

        return BadRequest(result.Error);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> UpdateCar(Guid id, Car newCar)
    {
        newCar.Id = id;

        var result = await Mediator.Send(new Edit.Command { Car = newCar });

        if (result.IsSuccess && result.Value != null)
            return Ok(result.Value);

        return BadRequest(result.Error);
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteCar(Guid id)
    {
        var result = await Mediator.Send(new Delete.Command { Id = id });

        if (result.IsSuccess)
            return Ok();

        return BadRequest(result.Error);
    }
}
