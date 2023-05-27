using DoItTest.Domain.Services;
using DoItTest.Services.Answers;
using DoItTest.Services.Answers.Repositories;
using DoItTest.Services.Students;
using DoItTest.Services.Students.Repositories;
using DoItTest.Services.Tests;
using DoItTest.Services.Tests.Repositories;
using DoItTest.Services.Users;
using DoItTest.Services.Users.Repositories;
using Microsoft.Extensions.DependencyInjection;

namespace DoItTest.Services.Configurator
{
    public static class ServicesConfigurator
    {
		private static String ConfiguratorSettings = "Host=localhost;Port=5432;Database=testcreater;Username=testcreater;Password=fdAV3m13HQ2cz";
		public static void InstanceConfigureServices(IServiceCollection services)
		{
			services.AddSingleton(new AnswersRepository(ConfiguratorSettings));
			services.AddSingleton(new StudentsRepository(ConfiguratorSettings));
			services.AddSingleton(new TestsRepository(ConfiguratorSettings));
			services.AddSingleton(new UsersRepository(ConfiguratorSettings));

			services.AddSingleton<IAnswersService, AnswersService>();
			services.AddSingleton<IUsersService, UsersService>();
			services.AddSingleton<ITestsService, TestsService>();
			services.AddSingleton<IStudentsService, StudentsService>();
		}
	}
}