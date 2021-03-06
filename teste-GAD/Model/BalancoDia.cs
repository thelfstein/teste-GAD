﻿using System;
using System.Collections.Generic;
using System.Linq;

namespace teste_GAD.Model
{
    public class BalancoDia
    {
        public DateTime DataBalanco { get; set; }
        public decimal ValorTotalCredito { get; set; }
        public decimal ValorTotalDebito { get; set; }
        public decimal ValorSaldo
        {
            get
            {
                return ValorTotalCredito - ValorTotalDebito;
            }
        }
        public decimal ValorSaldoAcumulado { get; set; }

        public BalancoDia(IEnumerable<LancamentoFinanceiro> lancamentos, DateTime dataLancamentos)
        {
            this.DataBalanco = dataLancamentos;
            this.ValorTotalCredito = lancamentos.Where(x => x.Tipo == 'C').Sum(x => x.Valor.Value);
            this.ValorTotalDebito = lancamentos.Where(x => x.Tipo == 'D').Sum(x => x.Valor.Value);
        }

        public BalancoDia()
        {
        }
    }
}
