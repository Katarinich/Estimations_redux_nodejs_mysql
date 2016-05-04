import pg from 'pg'

var conString = 'postgres://postgres:admin@localhost/estimations'

export function createEstimation(estimation, callback) {
  var query = 'INSERT INTO estimation (name, date_created,' +
    ' date_modified, total_sum, total_hours) VALUES (\'' + estimation.name +
    '\', \'' + estimation.dateCreated + '\', \'' + estimation.dateUpdated + '\', ' +
    estimation.totalSum + ', ' + estimation.totalHours + ')'

  pg.connect(conString, function(err, client, done) {
    if(err) {
      done()
      return console.error('error fetching client from pool', err)
    }

    client.query(query, function(err) {
      if(err) {
        done()
        return console.error(err)
      }

      done()
      callback()
    })
  })
}
