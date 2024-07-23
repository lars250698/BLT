import { Lift } from '../models/vportal-models'

export function prettyPrintLot(lot?: number): string {
  if (!lot) {
    return ''
  }
  return lot.toString()
}

export function prettyPrintWeight(weight?: number, defaultVal: string = ''): string {
  if (!weight) {
    return defaultVal
  }
  if (weight % 1 === 0) {
    return weight.toString()
  }
  return weight.toFixed(1)
}

export function prettyPrintLift(lift: Lift): string {
  switch (lift) {
    case Lift.Squat:
      return 'Kniebeuge'
    case Lift.BenchPress:
      return 'Bankdrücken'
    case Lift.Deadlift:
      return 'Kreuzheben'
    default:
      return ''
  }
}
