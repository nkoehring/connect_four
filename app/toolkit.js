define('app.toolkit', function() {

  function isValidPlayer(player) {
    //TODO: good enough for type check?
    return typeof player === "string"
  }

  function isValidCallback(callback) {
    //TODO: good enough for type check?
    return typeof callback === "function"
  }

  function parseTemplateFn(fn) {

    // source: https://github.com/x-tag/core/blob/master/src/core.js#L285
    var unwrap = /\/\*!?(?:\@preserve)?[ \t]*(?:\r\n|\n)([\s\S]*?)(?:\r\n|\n)\s*\*\//;
    return unwrap.exec(fn.toString())[1]

  }

  return {
    isValidPlayer: isValidPlayer,
    isValidCallback: isValidCallback,
    parseTemplateFn: parseTemplateFn
  }

})
