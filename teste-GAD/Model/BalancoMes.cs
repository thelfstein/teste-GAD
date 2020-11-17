using System;
using System.Collections.Generic;
using System.Linq;

namespace teste_GAD.Model
{
    public class BalancoMes
    {        
        public IEnumerable<BalancoDia> Balancos { get; set; }      
        public decimal ValorSaldo
        {
            get
            {
                return Balancos.Sum(x=>x.ValorSaldo);
            }
        }

        public BalancoMes(IEnumerable<BalancoDia> balancos)
        {
            this.Balancos = balancos;
        }

        public BalancoMes(){
        }
    }
}
