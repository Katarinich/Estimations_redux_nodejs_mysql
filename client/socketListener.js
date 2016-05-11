import socketClient from 'socket.io-client'

import {getEstimations} from '../common/actions/EstimationActions'

export default function (dispatch) {
  const socket = socketClient()
  socket.on('new-estimation', function(result){
    console.log('got a new estimation!', result)
		if(result.error){
			//Do nothing
		} else {
			dispatch(getEstimations());
		}
	})
}
