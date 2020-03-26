namespace Wallet.Domain.Entities
{
    public class Balance
    {
        public int Id { get; set; }
        public User User { get; set; }
        public string UserId { get; set; }
        public double Value { get; set; }
    }
}
