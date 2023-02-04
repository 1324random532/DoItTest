using DoItTest.Domain.Services;
using DoItTest.Services.Users;
using Microsoft.Extensions.DependencyInjection;

namespace DoItTest.Services.Configurator
{
    public static class ServicesConfigurator
    {
		private static String ConfiguratorSettings = "";
		public static void InstanceConfigureServices(IServiceCollection services)
		{
			services.AddSingleton<IUsersService>(new UsersService(ConfiguratorSettings));
		}
	}
}
