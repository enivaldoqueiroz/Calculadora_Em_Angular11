import { Component, OnInit } from '@angular/core';

import { CalculadoraService } from '../services';


@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.css']
})
export class CalculadoraComponent implements OnInit {
  //Atributos
  private numero1: string;
  private numero2: string;
  private resultado: number;
  private operacao: string;

  constructor(private calculadoraService: CalculadoraService) { }

  ngOnInit(): void {
    this.limpar();

  }
  /**
   * Incializa todos os operadores para os valores padrão
   * 
   * @return void
   */

   //Metodo limpar para o botão 'C'
   limpar(): void{
     this.numero1 = '0';
     this.numero2 = null;
     this.resultado = null;
     this.operacao = null;
   }

   /**
    * Adiciona o numero selecionado para o calculo posteriormente
    * @param string numero
    * @return void
    */

    adicionarNumero(numero: string): void{
      if(this.operacao === null){
        this.numero1 = this.concatenarNumero(this.numero1, numero);
      } else {
        this.numero2 = this.concatenarNumero(this.numero2, numero);
      }
    }

    /**
     * Returna o valor concatenado. Trata o separador decimal.
     * 
     * @param string numAtual
     * @param string numConcat
     * @return string 
     */

    concatenarNumero(numAtual: string, numConcat: string): string{
      // caso contenha apenas '0' ou null, reinicia o valor
      if(numAtual === '0' || numAtual === null){
        numAtual = '';
      }
      // primeiro digito é '.', concatena '0' antes do ponto
      if (numConcat === '.' && numAtual === '') {
        return '0.';
      }
      //caso '.' digitado e já contenha um '.', apenas retorna
      if (numConcat === '.' && numAtual.indexOf('.') > -1) {
        return numAtual;        
      }
      return numAtual + numConcat;

    }

    /**
     * Executa logica quando um operador for selecionado
     * Caso ja possua uma operaao selecionada, executa a
     * operação anterior, e define a nova operação.
     * 
     * @param string operacao
     * @return void
     */

     definirOperacao(operacao: string): void{
        //openas define a operação caso não exista uma
        if (this.operacao === null){
          this.operacao = operacao;
          return;
        }
        /** Caso operação definida e numero 2 selecionado,
      * efetua o calculo da operação
      */
     if (this.numero2 !== null){
      this.resultado = this.calculadoraService.calcular(
        perseFloat(this.numero1),
        perseFloat(this.numero2),
        this.operacao);
       this.operacao = operacao;
       this.numero1 = this.resultado.toString();
       this.numero2 = null;
       this.resultado = null;

      }
     }

     /**
      * Metodo Calcular de uma operação
      */
      calcular(): void{
        if (this.numero2 === null) {
          return;
        }
        this.resultado = this.calculadoraService.calcular(
          perseFloat(this.numero1),[
          perseFloat(this.numero2),
          this.operacao);
      }

      /**
       * Retorna o valor a ser exibido na tela da calculadora.
       * 
       * @return string
       */
      get display(): string{
        if(this.resultado !== null){
          return this.resultado.toString();
        }
        if(this.numero2 !== null){
          return this.numero2;
        }
          return this.numero1;
      }
}
