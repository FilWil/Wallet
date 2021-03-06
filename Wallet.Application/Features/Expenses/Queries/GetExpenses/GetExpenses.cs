﻿using MediatR;
using Wallet.Application.Features.Expenses.Dtos;
using Wallet.Domain.Core.Results;

namespace Wallet.Application.Features.Expenses.Queries.GetExpenses
{
    public class GetExpenses : IRequest<RequestResult<ExpenseDto>>
    {
    }
}
