using DoItTest.Domain.Services;
using DoItTest.Services.Answers;
using DoItTest.Services.Students;
using DoItTest.Services.Tests;
using DoItTest.Services.Users;
using Microsoft.Extensions.DependencyInjection;

namespace DoItTest.Services.Configurator
{
    public static class ServicesConfigurator
    {
		private static String ConfiguratorSettings = "Host=localhost;Port=5432;Database=testcreater;Username=testcreater;Password=fdAV3m13HQ2cz";
		public static void InstanceConfigureServices(IServiceCollection services)
		{
			services.AddSingleton<IAnswersService>(new AnswersService(ConfiguratorSettings));
			services.AddSingleton<IUsersService>(new UsersService(ConfiguratorSettings));
			services.AddSingleton<ITestsService>(new TestsService(ConfiguratorSettings));
			services.AddSingleton<IStudentsService>(new StudentsService(ConfiguratorSettings));
		}
	}
}