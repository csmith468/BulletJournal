using API.Data.Interfaces;
using API.Data.Repositories;
using API.Services;
using API.Data;
using Microsoft.EntityFrameworkCore;
using System.Data;
using Microsoft.Data.SqlClient;

namespace API.Extensions
{
    public static class ApplicationServiceExtensions {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config) {
            services.AddDbContext<DataContextEF>(opt => {
                opt.UseSqlServer(config.GetConnectionString("DefaultConnection"));
            });

            services.AddCors((options) => {
                options.AddPolicy("client", (corsBuilder) => {
                    corsBuilder.WithOrigins("https://localhost:4200", 
                                "https://localhost:8100", 
                                "http://localhost:8100",
                                "https://localhost:8080",
                                "http://localhost:8080",
                                "capacitor://localhost",
                                "ionic://localhost",
                                "https://localhost",
                                "http://localhost"
                        )
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .AllowCredentials();
                });
            });
            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddScoped<IAccountRepository, AccountRepository>();
            services.AddScoped(typeof(IChecklistRepository<>), typeof(ChecklistRepository<>));
            services.AddScoped<IMetadataRepository, MetadataRepository>();
            services.AddScoped<IPreferencesRepository, PreferencesRepository>();
            services.AddScoped<IStaticRepository, StaticRepository>();

            services.AddTransient<IDbConnection>(c => 
                new SqlConnection(config.GetConnectionString("DefaultConnection")));
            services.AddTransient<DataContextDapper>();

            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

            return services;
        }
    }
}