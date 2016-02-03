var Board = (function() {

  var Column = require('./column').Column,
      Toolkit = require('./toolkit').Toolkit,
      isValidPlayer = Toolkit.isValidPlayer,
      isValidCallback = Toolkit.isValidCallback

  var WIDTH = 7


  function Board() {

    this._columns = new Array(WIDTH)
    //TODO: more attributes needed per player?
    this._players = ["red", "blue"]
    this._current_player_index = 0
    this._winning_callback

    for(var i = 0; i < WIDTH; i++) {
      this._columns[i] = new Column
    }

  }

  Board.prototype = {

    get columns() {
      // just return a copy of the original columns array
      return this._columns.slice()
    },

    get current_player() {
      return this._players[this._current_player_index]
    },

    get player_one() {
      return this._players[0]
    },

    get player_two() {
      return this._players[1]
    },

    set player_one(one) {

      if (isValidPlayer(one)) {
        this._players[0] = one
      }

    },

    set player_two(two) {

      if (isValidPlayer(two)) {
        this._players[0] = two
      }

    },

    get winning_callback() {
      return this._winning_callback
    },

    set winning_callback(cb) {

      if (isValidCallback(cb)) {
        this._winning_callback = cb
      }

    },

    move: function(column) {

      var column = this._columns[column]

      // do not do anything if move is invalid
      if (!column || column.full) {
        console.log(column ? "full" : "invalid")
        return false
      }

      column.insert(this.current_player)

      // switch to other player
      this._current_player_index = (this._current_player_index + 1) % 2

      return this.current_player

    },

    //DEBUG
    inspect: function() {

      var output = ""

      this._columns.map(function(col,i) {
        output += col.inspect() + "\n"
      })

      return output

    }

  }

  return Board

})()

exports.Board = Board

