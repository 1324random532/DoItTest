using DoItTest.Site;
using DoItTest.Site.Infrastructure.Filters;
using DoItTest.Tools.Json;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

builder.Initialize();

builder.Services.AddControllersWithViews(mvcOptions =>
{
    mvcOptions.Filters.Add<IsAuthorizedFilter>();
}).AddJsonOptions(options =>
{
    options.JsonSerializerOptions.AddJsonSettings();
    options.JsonSerializerOptions.ApplyToolsConverters();
});

WebApplication app = builder.Build();
AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
AppContext.SetSwitch("Npgsql.DisableDateTimeInfinityConversions", true);
app.UseCors();
app.UseHttps();
app.UseStaticFiles();
app.UseEndpointsRouting();
app.Run();
