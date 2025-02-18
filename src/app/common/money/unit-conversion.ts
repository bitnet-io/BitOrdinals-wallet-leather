import BigNumber from 'bignumber.js';

import { BIT_DECIMALS, STX_DECIMALS } from '@shared/constants';
import { Money } from '@shared/models/money.model';

import { initBigNumber } from '../math/helpers';

function fractionalUnitToUnit(decimals: number) {
  return (unit: number | string | BigNumber) => {
    const unitBigNumber = initBigNumber(unit);
    return unitBigNumber.shiftedBy(-decimals);
  };
}

export function unitToFractionalUnit(decimals: number) {
  return (unit: number | string | BigNumber) => {
    const unitBigNumber = initBigNumber(unit);
    return unitBigNumber.shiftedBy(decimals);
  };
}

export const satToBtc = fractionalUnitToUnit(BIT_DECIMALS);
export const btcToSat = unitToFractionalUnit(BIT_DECIMALS);

export const microStxToStx = fractionalUnitToUnit(STX_DECIMALS);
export const stxToMicroStx = unitToFractionalUnit(STX_DECIMALS);

export function moneyToBaseUnit(sum: Money) {
  return fractionalUnitToUnit(sum.decimals)(sum.amount);
}
