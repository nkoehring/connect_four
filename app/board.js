define('app.board', ['app.column', 'app.toolkit'], function(Column, Toolkit) {

  var isValidPlayer = Toolkit.isValidPlayer,
      isValidCallback = Toolkit.isValidCallback


  function Board(width, height) {

    this._width = width
    this._height = height

    this._columns = new Array(width)
    //TODO: more attributes needed per player?
    this._players = ["red", "blue"]
    this._current_player_index = 0
    this._winning_callback
    this._move_callback
    this._clear_callback

    for(var i = 0; i < width; i++) {
      this._columns[i] = new Column(height)
    }

  }

  Board.prototype = {

    get width() {
      return this._width
    },

    get height() {
      return this._height
    },

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
        this._players[1] = two
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

    get move_callback() {
      return this._move_callback
    },

    set move_callback(cb) {

      if (isValidCallback(cb)) {
        this._move_callback = cb
      }

    },

    get clear_callback() {
      return this._clear_callback
    },

    set clear_callback(cb) {

      if (isValidCallback(cb)) {
        this._clear_callback = cb
      }

    },

    get full() {
      return this._columns.every(function(column) { return column.full })
    },

    move: function(column_index) {

      var column = this._columns[column_index],
          used_slots

      // do not do anything if move is invalid
      if (!column || column.full) {
        console.log(column ? "full" : "invalid")
        return false
      }

      used_slots = column.insert(this.current_player)

      // switch to other player
      this._current_player_index = (this._current_player_index + 1) % 2

      if (this._move_callback) {
        this._move_callback(
          column_index,
          this._height - used_slots,
          this.current_player
        )
      }

      return this.current_player

    },

    clear: function() {

      this._columns.forEach(function(column) {
        column.clear()
      })

      if (this._clear_callback) {
        this._clear_callback()
      }

    }

  }

  return Board

})
