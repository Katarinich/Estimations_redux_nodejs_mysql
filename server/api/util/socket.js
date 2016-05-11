import socketIo from 'socket.io'
var io

module.exports = {
	setServer: function(server) {
		io = socketIo(server)

		io.on('connection', function() {
      console.log('a user connected')
    })
	},

	notifyAllListenersOfNewEstimation: function(estimation) {
		io.emit('new-estimation', estimation);
	}
}
