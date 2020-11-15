using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace teste_GAD.Model
{
    public class LancamentoFinanceiro
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public DateTime DataHoraLancamento { get; set; } = DateTime.Now;
        public decimal Valor { get; set; }
        //C - Crédito; D - Débito
        public char Tipo { get; set; }
        //True - Conciliado; False - Não Conciliado
        public bool Status { get; set; }

        [NotMapped]
        public string TipoString
        {
            get
            {
                switch (Tipo)
                {
                    case 'D':
                        return "Débito";
                    case 'C':
                        return "Crédito";
                    default:
                        return "N/A";
                }

            }
        }

    }
}
