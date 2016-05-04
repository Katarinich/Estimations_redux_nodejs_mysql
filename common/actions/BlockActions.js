import { GET_INPUT } from '../constants/Block'

export function getInput(isInput) {
  
  return {
    type: GET_INPUT,
    payload: ! isInput
  }

}
