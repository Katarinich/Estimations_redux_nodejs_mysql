import pg from 'pg'

var conString = 'postgres://postgres:admin@localhost/estimations'

export function createBlocks(estimationId, callback) {
  var rootBlock = createRootBlock(estimationId)

  var query = 'INSERT INTO block (text, index,' +
    ' estimation_id, is_parent) VALUES (\'' + rootBlock.text +
    '\', ' + rootBlock.index + ', ' + rootBlock.estimationId +
    ', \'' + rootBlock.isParent + '\') RETURNING id'

  pg.connect(conString, function(err, client, done) {
    if(err) {
      done()
      return console.error('error fetching client from pool', err)
    }

    client.query(query, function(err, result) {
      if(err) {
        console.log(err)
        callback(err)
      }
      console.log(result)

      var childBlock = createChildBlock(result.rows[0].id, estimationId)
      var query = 'INSERT INTO block (text, index, hours, rate,' +
        ' parent_block_id, estimation_id, is_parent) VALUES (\'' + childBlock.text +
        '\', ' + childBlock.index + ', \'' + childBlock.hours + '\', ' +
        childBlock.rate + ', ' + childBlock.parentBlockId + ', ' +
        childBlock.estimationId + ', \'' + childBlock.isParent + '\')'

      client.query(query, function(err){
        callback(err)
      })

    })
  })
}

export function getBlocks(estimationId, callback) {
  var query = 'SELECT * FROM block WHERE estimation_id=' + estimationId

  pg.connect(conString, function(err, client) {
    client.query(query, function(err, result) {
      if(err) {
        console.log(err)
        callback(err)
      }
      callback(err, result.rows)
    })
  })
}

function createRootBlock(estimationId) {
  return {
    text: 'Development Activities',
    index: 0,
    isParent: true,
    estimationId: estimationId
  }
}

function createChildBlock(rootBlockId, estimationId) {
  return {
    text: '',
    index: 0,
    hours: '',
    rate: 0,
    isParent: false,
    parentBlockId: rootBlockId,
    estimationId: estimationId
  }
}
