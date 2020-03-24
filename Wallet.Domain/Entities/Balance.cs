using System;
using System.Collections.Generic;
using System.Text;

namespace Wallet.Domain.Entities
{
    public class Balance
    {
        public User User { get; set; }
        public string UserId { get; set; }
    }
}
