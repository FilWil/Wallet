using AutoMapper;
using MediatR;
using System;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Wallet.Application.Features.Expenses.Dtos;
using Wallet.Domain.Core.Results;
using Wallet.Domain.Entities;
using Wallet.Domain.Interfaces;

namespace Wallet.Application.Features.Expenses.Commands.AddExpense
{
    public class AddExpenseHandler : IRequestHandler<AddExpense, RequestResult<ExpenseDto>>
    {
        private readonly IExpenseRepository ExpenseRepository;
        private readonly IUserRepository UserRepository;
        private readonly IMapper Mapper;
        
        public AddExpenseHandler(IExpenseRepository expenseRepository, IMapper mapper, IUserRepository userRepository)
        {
            ExpenseRepository = expenseRepository;
            Mapper = mapper;
            UserRepository = userRepository;
        }
        
        public async Task<RequestResult<ExpenseDto>> Handle(AddExpense request, CancellationToken cancellationToken)
        {
            var result = new RequestResult<ExpenseDto>();

            var user = UserRepository
                .GetById(request.UserId);

            if (user is null)
            {
                result.AddError($"User with id {request.UserId} was not found", HttpStatusCode.NotFound);
                return result;
            }

            user.BalanceValue -= Math.Round(request.Value, 2);

            UserRepository.Update(user);

            var expense = new Expense()
            {
                Id = Guid.NewGuid().ToString(),
                CreatedAt = DateTime.UtcNow,
                Name = request.Name,
                Value = Math.Round(request.Value, 2),
                User = user
            };

            ExpenseRepository.Add(expense);
            ExpenseRepository.SaveChanges();

            result.SetSingleItem(Mapper.Map<ExpenseDto>(expense));
            result.StatusCode = HttpStatusCode.OK;

            return result;
        }
    }
}
