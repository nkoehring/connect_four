define('app.toolkit', function() {

  function isValidPlayer(player) {
    //TODO: good enough for type check?
    return typeof player === "string"
  }

  function isValidCallback(callback) {
    //TODO: good enough for type check?
    return typeof callback === "function"
  }

  return {
    isValidPlayer: isValidPlayer,
    isValidCallback: isValidCallback
  }

})
