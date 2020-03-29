using AutoMapper;
using MediatR;
using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Wallet.Application.Features.Incomes.Dtos;
using Wallet.Domain.Core.Results;
using Wallet.Domain.Entities;
using Wallet.Domain.Interfaces;

namespace Wallet.Application.Features.Incomes.Commands.AddIncome
{
    public class AddIncomeHandler : IRequestHandler<AddIncome, RequestResult<IncomeDto>>
    {
        private readonly IUserRepository UserRepository;
        private readonly IIncomeRepository IncomeRepository;
        private readonly IMapper Mapper;

        public AddIncomeHandler(IUserRepository userRepository, IIncomeRepository incomeRepository, IMapper mapper)
        {
            UserRepository = userRepository;
            IncomeRepository = incomeRepository;
            Mapper = mapper;
        }
        
        public async Task<RequestResult<IncomeDto>> Handle(AddIncome request, CancellationToken cancellationToken)
        {
            var result = new RequestResult<IncomeDto>();

            var user = UserRepository
                .GetById(request.UserId);

            if (user is null)
            {
                result.AddError($"User with id {request.UserId} was not found", HttpStatusCode.NotFound);
                return result;
            }

            user.BalanceValue += request.Value;
            
            UserRepository.Update(user);

            var income = new Income()
            {
                Id = Guid.NewGuid().ToString(),
                CreatedAt = DateTime.UtcNow,
                Name = request.Name,
                Value = request.Value,
                User = user
            };

            IncomeRepository.Add(income);
            IncomeRepository.SaveChanges();

            result.SetSingleItem(Mapper.Map<IncomeDto>(income));
            result.StatusCode = HttpStatusCode.OK;

            return result;
        }
    }
}
