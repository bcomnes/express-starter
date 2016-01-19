function hi (name) {
  console.log('hello ' + name)
}

function bye (name) {
  console.log('bye ' + name)
}

module.exports = hi
module.exports.bye = bye
