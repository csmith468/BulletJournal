using API.Data.Interfaces;
using AutoMapper;

namespace API.Data.Repositories {
    public class UnitOfWork : IUnitOfWork {
        // private readonly DataContextDapper _contextDapper;
        private readonly DataContextEF _contextEF;
        private readonly IMapper _mapper;
        public UnitOfWork(DataContextEF contextEF, IMapper mapper) {
            _contextEF = contextEF;
            _mapper = mapper;
        }

        public IUserRepository UserRepository => new UserRepository(_contextEF, _mapper);
        public ISleepRepository SleepRepository => new SleepRepository(_contextEF, _mapper);
        public IMorningRepository MorningRepository => new MorningRepository(_contextEF, _mapper);
        public INightRepository NightRepository => new NightRepository(_contextEF, _mapper);
        
        public async Task<bool> Complete() {
            var r = HasChanges();
            var result = await _contextEF.SaveChangesAsync();
            return result > 0;
        }

        public bool HasChanges() {
            return _contextEF.ChangeTracker.HasChanges();
        }
    }
}