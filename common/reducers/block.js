import { GET_INPUT } from '../constants/actionTypes'

const initialState = {
  text: 'Development Block',
  hours: '',
  rate: '',
  parentBlockId: null,
  id: 1,
  isInput: false,
  children: [{
    text: '',
    hours: '',
    rate: 0,
    parentBlockId: 1,
    isInput: false,
    id: 2
  }]
}

export default function block(state = initialState, action) {
  switch (action.type) {
    case GET_INPUT:
      return { ...state, isInput: action.payload }

    default:
      return state;
  }
}
