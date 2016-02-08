define('app.board', ['app.column', 'app.toolkit'], function(Column, Toolkit) {

  var isValidPlayer = Toolkit.isValidPlayer,
      isValidCallback = Toolkit.isValidCallback


  function Board(width, height) {

    var self = this

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


    this.move = function(column_index) {

      var column = self._columns[column_index],
          used_slots

      // do not do anything if move is invalid
      if (!column || column.full) {
        return false
      }

      used_slots = column.insert(self.current_player)

      if (self._move_callback) {
        self._move_callback(
          column_index,
          self._height - used_slots,
          self.current_player
        )
      }

      self.checkFourInRow(column_index, used_slots - 1)

      // switch to other player
      self._current_player_index = (self._current_player_index + 1) % 2
      return self.current_player // actually the next player

    }


    this.clear = function() {

      self._current_player_index = 0

      self._columns.forEach(function(column) {
        column.clear()
      })

      if (self._clear_callback) {
        self._clear_callback()
      }

    }


    this.checkFourInRow = function(x,y) {

      var four_in_a_row = {},
          columns = self._columns,
          //player = self.current_player,
          player = self._columns[x].slots[y],
          column = columns[x].slots,
          row = columns.map(function(column) { return column.slots[y] }),
          diagonal1 = [], // bottom up
          diagonal2 = [], // top down
          short_to_start = x < y ? x : y, // needed to find the diagonal start
          short_to_end = width - x - 1 < y ? width - x - 1 : y,
          x_, y_, tmp

      // diagonal1 from bottom to top right (0,0 is bottom left)
      x_ = x - short_to_start,
      y_ = y - short_to_start

      while(x_ < width && y_ < height) {
        diagonal1.push(columns[x_++].slots[y_++])
      }

      // diagonal2 from bottom to top left
      x_ = x + short_to_end,
      y_ = y - short_to_end

      while(x_ && y_ < height) {
        diagonal2.push(columns[x_--].slots[y_++])
      }

      column = column.filter(function(t,i,arr) {
        return t == player && arr[i+1] == player
      })

      row = row.filter(function(t,i,arr) {
        return t == player && arr[i+1] == player
      })

      diagonal1 = diagonal1.filter(function(t,i,arr) {
        return t == player && arr[i+1] == player
      })

      diagonal2 = diagonal2.filter(function(t,i,arr) {
        return t == player && arr[i+1] == player
      })

      if (column.length >= 3 || row.length >= 3 ||
          diagonal1.length >= 3 || diagonal2.length >= 3) {

        if(self._winning_callback) {
          self._winning_callback(self._current_player_index)
        }

        return player
      }

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
    }

  }

  return Board

})
