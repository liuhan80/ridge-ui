const sleep = mill => {
  return new Promise(resolve => {
    setTimeout(resolve, mill)
  })
}

module.exports = sleep
