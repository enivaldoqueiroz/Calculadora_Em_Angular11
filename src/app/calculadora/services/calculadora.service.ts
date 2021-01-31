/**
* Serviço responsável por executar as operações da calculadora.
*@author Enivaldo Queiroz<enivaldo.jecq@gmail.com>
*@since 1.0.0
*/

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculadoraService {

  //Constantes utilizadas para identificar as operações de calculo
  static readonly SOMA: string = '+';
  static readonly SUBTRACAO: string = '-';
  static readonly DIVISAO: string =  '/';
  static readonly MULTIPLICACAO: string = '*';

  constructor() { }

  /*
  * Suporta as perações SOMA, SUBTRAÇÂO, DIVISÃO e MULTIPLICAÇÂO
  *
  *@param num1 number
  *@param num2 number
  *@param operacao string Operação a ser executado
  *@return number Resultado da operação
  */
 
  //Metodo calcular
  calcular(num1: number, num2: number, operacao: string): number{
    let resultado: number; // Armazena o resultado da operação

    switch(operacao){
      case CalculadoraService.SOMA: resultado = num1 + num2;
      break;
      case CalculadoraService.SUBTRACAO: resultado = num1 - num2;
      break;
      case CalculadoraService.DIVISAO: resultado = num1 / num2;
      break;
      case CalculadoraService.MULTIPLICACAO: resultado = num1 * num2;
      break;
      default: resultado = 0;

    }
    return resultado;

  }
}
