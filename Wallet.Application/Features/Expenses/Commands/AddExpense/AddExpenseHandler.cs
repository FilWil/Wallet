using AutoMapper;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using Wallet.Application.Features.Expenses.Dtos;
using Wallet.Domain.Core.Results;
using Wallet.Domain.Interfaces;

namespace Wallet.Application.Features.Expenses.Commands.AddExpense
{
    public class AddExpenseHandler : IRequestHandler<AddExpense, RequestResult<ExpenseDto>>
    {
        private readonly IExpenseRepository ExpenseRepository;
        private readonly IMapper Mapper;
        
        public AddExpenseHandler(IExpenseRepository expenseRepository, IMapper mapper)
        {
            ExpenseRepository = expenseRepository;
            Mapper = mapper;
        }
        
        public async Task<RequestResult<ExpenseDto>> Handle(AddExpense request, CancellationToken cancellationToken)
        {
            var result = new RequestResult<ExpenseDto>();

            return result;
        }
    }
}
