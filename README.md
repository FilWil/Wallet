# Wallet
ASP.NET Core application with DDD approach

## Running EF Core commands

Due to EF Core 3.1 doesn't support yet updating db/adding migrations within Class Libraries there is a solution without implemening ```IDesignTimeDbContextFactory```

Set active directory in console for project/library containing migrations ```\Wallet.Infrastructure```. Commands should have ```--startup-project``` parameter set to startup project location 

Updating database:

```dotnet ef database update --startup-project ../Wallet.Web/```

Adding new migrating:

```dotnet ef migrations add "<migration-name>" --startup-project ../Wallet.Web/```
