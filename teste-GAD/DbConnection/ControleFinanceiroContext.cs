using Microsoft.EntityFrameworkCore;
using teste_GAD.Model;


namespace teste_GAD.DbConnection
{
    public class LancamentoFinanceiroContext : DbContext
    {
        public LancamentoFinanceiroContext(DbContextOptions<LancamentoFinanceiroContext> options) : base(options)
        {

        }

        public DbSet<LancamentoFinanceiro> LancamentosFinanceiros { get; set; }
        
    }
}
