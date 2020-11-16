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
    public class LancamentoFinanceiroController : ControllerBase
    {
        private readonly LancamentoFinanceiroContext _ctx;

        public LancamentoFinanceiroController(LancamentoFinanceiroContext ctx)
        {
            _ctx = ctx;
            _ctx.Database.EnsureCreated();
        }

        [HttpGet]
        public async Task<IActionResult> GetLancamentosFinanceiros()
        {
            try
            {
                var data = await _ctx.LancamentosFinanceiros.ToListAsync();
                return Ok(data.OrderBy(x=>x.DataHoraLancamento));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

        }

        [HttpGet]
        public async Task<IActionResult> GetLancamentoFinanceiroById(int? id)
        {
            try
            {
                var data = await _ctx.LancamentosFinanceiros.Where(x=>x.Id == id).FirstOrDefaultAsync();

                if (data == null)
                    return NotFound();

                return Ok(data);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

        }

        [HttpPost]
        public async Task<IActionResult> PostLancamentoFinanceiro(LancamentoFinanceiro lancamento)
        {
            try
            {
                lancamento.Status = false;

                _ctx.LancamentosFinanceiros.Add(lancamento);

                await _ctx.SaveChangesAsync();

                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

        }

        [HttpPut]
        public async Task<IActionResult> PutLancamentoFinanceiro(LancamentoFinanceiro lancamento)
        {
            try
            {
                var oldLancamento = await _ctx.LancamentosFinanceiros.FirstOrDefaultAsync(x => x.Id == lancamento.Id);

                if (oldLancamento == null)
                    return NotFound();

                if (oldLancamento.Status)
                    throw new Exception("O lançamento já foi conciliado");

                _ctx.Entry(oldLancamento).State = EntityState.Detached;

                _ctx.Update(lancamento);

                await _ctx.SaveChangesAsync();

                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteLancamentoFinanceiro(LancamentoFinanceiro lancamento)
        {
            try
            {
                var oldLancamento = await _ctx.LancamentosFinanceiros.FirstOrDefaultAsync(x => x.Id == lancamento.Id);

                if (oldLancamento == null)
                    return NotFound();

                if (oldLancamento.Status)
                    throw new Exception("O lançamento já foi conciliado");

                _ctx.Entry(oldLancamento).State = EntityState.Detached;

                _ctx.Remove(lancamento);

                await _ctx.SaveChangesAsync();

                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
