using DoItTest.Domain.Services;
using DoItTest.Services.Users;
using Microsoft.Extensions.DependencyInjection;

namespace DoItTest.Services.Configurator
{
    public static class ServicesConfigurator
    {
		private static String ConfiguratorSettings = "Host=localhost;Port=5432;Database=testcreater;Username=testcreater;Password=fdAV3m13HQ2cz";
		public static void InstanceConfigureServices(IServiceCollection services)
		{
			services.AddSingleton<IUsersService>(new UsersService(ConfiguratorSettings));
		}
	}
}