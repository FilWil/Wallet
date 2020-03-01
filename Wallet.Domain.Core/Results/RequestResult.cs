namespace Wallet.Domain.Core.Results
{
    public class RequestResult<T>
    {
        public bool Success { get; }
        public string Message { get; }
        public T Item { get; }

        public RequestResult(bool isSuccess, T item, string message)
        {
            Message = message;
            Item = item;
            Success = isSuccess;
        }
    }
}
