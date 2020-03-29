using AutoMapper;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Wallet.Application.Features.Incomes.Dtos;
using Wallet.Domain.Core.Results;
using Wallet.Domain.Interfaces;

namespace Wallet.Application.Features.Incomes.Queries.GetIncomes
{
    public class GetIncomesHandler : IRequestHandler<GetIncomes, RequestResult<IncomeDto>>
    {
        private readonly IIncomeRepository IncomeRepository;
        private readonly IMapper Mapper;

        public GetIncomesHandler(IIncomeRepository incomeRepository, IMapper mapper)
        {
            IncomeRepository = incomeRepository;
            Mapper = mapper;
        }
        
        public async Task<RequestResult<IncomeDto>> Handle(GetIncomes request, CancellationToken cancellationToken)
        {
            var result = new RequestResult<IncomeDto>();

            var expenses = IncomeRepository
                .GetAllWithUsers();

            result.SetCollection(Mapper.Map<List<IncomeDto>>(expenses));

            return result;
        }
    }
}
