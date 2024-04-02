using Mansor.Business.Services;
using Mansor.Business.Services.Interfaces;
using Mansor.Data;
using Mansor.Data.Repositories;
using Mansor.Data.Repositories.Interfaces;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(connectionString));
builder.Services.AddDatabaseDeveloperPageExceptionFilter();

builder.Services.AddDefaultIdentity<User>(options => options.SignIn.RequireConfirmedAccount = true)
    .AddEntityFrameworkStores<ApplicationDbContext>();

builder.Services.AddIdentityServer()
    .AddApiAuthorization<User, ApplicationDbContext>();

builder.Services.AddAuthentication()
    .AddIdentityServerJwt();

builder.Services.AddControllersWithViews();
builder.Services.AddRazorPages();

builder.Services.AddScoped<ITaskGroupsRepository, TaskGroupsRepository>();
builder.Services.AddScoped<ITaskGroupsService, TaskGroupsService>();

builder.Services.AddScoped<ITaskItemsRepository, TaskItemsRepository>();
builder.Services.AddScoped<ITaskItemsService, TaskItemsService>();

builder.Services.AddScoped<INotesRepository, NotesRepository>();
builder.Services.AddScoped<INotesService, NotesService>();

builder.Services.AddScoped<IUsersRepository, UsersRepository>();
builder.Services.AddScoped<IUsersService, UsersService>();

builder.Services.AddScoped<IDaysRepository, DaysRepository>();
builder.Services.AddScoped<IDaysService, DaysService>();

builder.Services.AddScoped<ISubjectsRepository, SubjectsRepository>();
builder.Services.AddScoped<ISubjectsService, SubjectsService>();

builder.Services.AddScoped<ISpecialitiesRepository, SpecialitiesRepository>();
builder.Services.AddScoped<ISpecialitiesService, SpecialitiesService>();

builder.Services.AddScoped<IStudentsRepository, StudentsRepository>();
builder.Services.AddScoped<IStudentsService, StudentsService>();

builder.Services.AddScoped<IGradesRepository, GradesRepository>();
builder.Services.AddScoped<IGradesService, GradesService>();

builder.Services.AddControllers().AddJsonOptions(options => options.JsonSerializerOptions.MaxDepth = 64);

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyHeader()
               .AllowAnyMethod();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseMigrationsEndPoint();
}
else
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseCors(builder =>
{
    builder.AllowAnyOrigin()
           .AllowAnyHeader()
           .AllowAnyMethod();
});

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.UseAuthentication();
app.UseIdentityServer();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");
app.MapRazorPages();

app.MapFallbackToFile("index.html"); ;

app.Run();
