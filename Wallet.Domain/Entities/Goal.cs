using System;
using System.Collections.Generic;
using System.Text;
using Wallet.Domain.Core.Models;

namespace Wallet.Domain.Entities
{
    public class Goal : BaseEntity
    {
        public int Id { get; set; }
        public User User { get; set; }
        public string UserId { get; set; }
        public string Name { get; set; }
        public double TargetValue { get; set; }
    }
}
