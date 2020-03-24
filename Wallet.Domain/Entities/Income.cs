using System;
using System.Collections.Generic;
using System.Text;

namespace Wallet.Domain.Entities
{
    public class Income
    {
        public User User { get; set; }
        public string UserId { get; set; }
    }
}
