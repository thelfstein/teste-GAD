using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using teste_GAD.DbConnection;
using teste_GAD.Model;

namespace teste_GAD.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class BalancoController : ControllerBase
    {
        private readonly LancamentoFinanceiroContext _ctx;

        public BalancoController(LancamentoFinanceiroContext ctx)
        {
            _ctx = ctx;
            _ctx.Database.EnsureCreated();
        }

        [HttpGet]
        public async Task<IActionResult> GetBalancoByDate(DateTime date)
        {
            try
            {
                var data = await _ctx.LancamentosFinanceiros.Where(x => x.DataHoraLancamento.Value.Date == date.Date).ToListAsync();
                return Ok(new BalancoDia(data, date));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

        }

        [HttpGet]
        public async Task<IActionResult> GetBalancoByMonth(DateTime date)
        {
            try
            {
                var data = await _ctx.LancamentosFinanceiros.Where(x => x.DataHoraLancamento.Value.Month == date.Month).ToListAsync();

                var balancoList = new List<BalancoDia>();

                foreach (var dt in data.OrderBy(x => x.DataHoraLancamento).Select(x => x.DataHoraLancamento.Value.Date).Distinct())
                {
                    balancoList.Add(new BalancoDia(data.Where(x => x.DataHoraLancamento.Value.Date == dt), dt));
                }

                decimal lastSaldo = 0;

                foreach (var b in balancoList)
                {
                    b.ValorSaldoAcumulado = b.ValorSaldo + lastSaldo;
                    lastSaldo = b.ValorSaldoAcumulado;
                }

                return Ok(balancoList);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

        }

    }
}
