namespace Wallet.Web.Configurations
{
    public class JwtSettings
    {
        public string Secret { get; set; }
        public int Lifespan { get; set; }
    }
}