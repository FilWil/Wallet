using Humanizer;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text.Json.Serialization;

namespace Wallet.Domain.Core.Results
{
    public class RequestResult<T>
    {
        [JsonIgnore]
        public IList<T> Collection { get; private set; }

        [JsonIgnore]
        public T Item => Collection.FirstOrDefault();

        public HttpStatusCode? StatusCode;

        public bool IsSuccess { get; set; } = true;
        public bool HasSingleItem { get; private set; }
        public string ActionName { get; set; }

        public IList<string> Errors { get; protected set; } = new List<string>();

        public RequestResult()
        {
            StatusCode = null;
            Collection = new List<T>();
        }

        public void SetCollection(IList<T> collection)
        {
            Collection = collection;
            HasSingleItem = false;
        }

        public void SetSingleItem(T item)
        {
            Collection.Clear();
            Collection.Add(item);
            HasSingleItem = true;
        }

        public void AddError(string error, HttpStatusCode statusCode)
        {
            Errors.Add(error);
            IsSuccess = false;
            StatusCode = statusCode;
        }

        public void AddError(string error)
        {
            Errors.Add(error);
            IsSuccess = false;
        }

        public IResponseResult GetResult()
        {
            if (HasSingleItem)
            {
                return new ResponseResult<T>
                {
                    Item = Item,
                    StatusCode = StatusCode,
                    Errors = Errors,
                };
            }
            else
            {
                return new ResponseResult<IList<T>>
                {
                    Item = Collection,
                    StatusCode = StatusCode,
                    Errors = Errors,
                };
            }
        }
    }

    public class ResponseResult<T> : IResponseResult
    {
        public T Item { get; set; }
        public HttpStatusCode? StatusCode { get; set; }
        public string ActionName { get; set; }
        public IList<string> Errors { get; set; }
    }

    public interface IResponseResult { }
}
