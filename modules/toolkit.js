function isValidPlayer(player) {
  //TODO: good enough for type check?
  return typeof player === "string"
}

function isValidCallback(callback) {
  //TODO: good enough for type check?
  return typeof callback === "function"
}

exports.Toolkit = {
  isValidPlayer: isValidPlayer,
  isValidCallback: isValidCallback
}
