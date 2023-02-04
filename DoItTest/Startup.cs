using DoItTest.Services.Configurator;

namespace DoItTest.Site
{
    public static class Startup
    {
        public static void Initialize(IServiceCollection services, string environment, ConfigurationManager? configuration)
        {
            ServicesConfigurator.InstanceConfigureServices(services);
        }

        public static void Initialize(this WebApplicationBuilder builder)
        {
            Initialize(builder.Services, builder.Environment.EnvironmentName, builder.Configuration);
        }

        public static void UseHttps(this WebApplication app)
        {
            app.UseHsts();
            app.UseHttpsRedirection();
        }

        public static void UseEndpointsRouting(this WebApplication app, Action<IApplicationBuilder>? middlewareBuilder = null)
        {
            app.UseRouting();
            middlewareBuilder?.Invoke(app);
            app.UseEndpoints(endpoints => endpoints.MapDefaultControllerRoute());
        }
    }
}
