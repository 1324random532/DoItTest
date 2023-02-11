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
app.UseCors();
app.UseHttps();
app.UseStaticFiles();
app.UseEndpointsRouting();
app.Run();
