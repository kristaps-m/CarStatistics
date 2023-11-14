using CarStatistics.Core.models;

namespace CarStatistics.Core.Interfaces
{
    public interface IEntityService<T> where T : Entity
    {
        void Create(T entity);

        void Delete(T entity);

        void Update(T entity);

        List<T> GetAll();

        T GetById(int id);

        IQueryable<T> Query();
    }
}
