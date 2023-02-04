using DoItTest.Site;
using DoItTest.Tools.Json;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

builder.Initialize();

builder.Services.AddControllersWithViews(mvcOptions =>
{

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
