define('app.column', function() {

  function Column(height) {
    this._height = height
    this._slots = []
  }

  Column.prototype = {

    get full() {
      return this._slots.length >= this._height
    },

    get length() {
      return this._slots.length
    },

    get slots() {

      // just return a copy of the precious original slots array
      // could be optimized by caching the result in case someone extends this
      // game to columns of length 1000
      var output = this._slots.slice()

      while(output.length < this._height) {
        output.push(null)
      }

      return output

    },

    insert: function(player) {

      if(this.full) {
        return false
      }

      this._slots.push(player)
      return this._slots.length

    },

    //DEBUG
    inspect: function() {
      return this._slots.join("|")
    }

  }

  return Column

})
