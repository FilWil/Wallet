using AutoMapper;
using MediatR;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Wallet.Application.Features.Expenses.Dtos;
using Wallet.Domain.Core.Results;
using Wallet.Domain.Interfaces;

namespace Wallet.Application.Features.Expenses.Queries
{
    public class GetExpensesHandler : IRequestHandler<GetExpenses, RequestResult<ExpenseDto>>
    {
        private readonly IExpenseRepository ExpenseRepository;
        private readonly IMapper Mapper;

        public GetExpensesHandler(IExpenseRepository expenseRepository, IMapper mapper)
        {
            ExpenseRepository = expenseRepository;
            Mapper = mapper;
        }

        public async Task<RequestResult<ExpenseDto>> Handle(GetExpenses request, CancellationToken cancellationToken)
        {
            var result = new RequestResult<ExpenseDto>();

            var expenses = ExpenseRepository
                .GetAllWithUsers();

            result.SetCollection(Mapper.Map<List<ExpenseDto>>(expenses));

            return result;
        }
    }
}
