define("app.renderer", function() {


  function getSlot(m, n) {

    columnQuery = "#container .board .column:nth-child(" + (m + 1) + ")"
    slotQuery = columnQuery + " .slot:nth-child(" + (n + 1) + ")"

    return document.querySelector(slotQuery)

  }


  function createTokenDOM(column, slot, color) {
    var token_el = document.createElement("div"),
        slot_el

    token_el.className = "token"

    slot_el = getSlot(column, slot)
    offset_left = slot_el.offsetLeft + "px"
    offset_top = slot_el.offsetTop + "px"

    token_el.style.left = offset_left
    token_el.style.backgroundColor = color

    setTimeout(function() {
      token_el.style.top = offset_top
    }, 100)

    return token_el
  }


  function createSlotDOM() {

    var slot = document.createElement("div")
    slot.className = "slot"
    return slot

  }


  function createColumnDOM(height) {

    var column = document.createElement("div")
    column.className = "column"

    while(height--) {
      column.appendChild( createSlotDOM() )
    }

    return column
    
  }


  function createBoardDOM(width, height) {

    var board = document.createElement("div")
    board.className = "board"

    while(width--) {
      board.appendChild( createColumnDOM(height) )
    }

    return board
    
  }


  function createSetupOverlayDOM() {

    var overlay = document.createElement("div")
    board.className = "board"

    while(width--) {
      board.appendChild( createColumnDOM(height) )
    }

    return board
    
  }


  function Renderer(container, board) {

    var self = this

    this._container = container
    this._board = board

    this.renderBoard = function() {

      self._board_el = createBoardDOM(self.width, self.height)
      self._container.appendChild(self._board_el)

    }

    this.renderToken = function(column, slot, color) {

      var board_el = self._board_el,
          token_el = createTokenDOM(column, slot, color)

      self._container.insertBefore(token_el, board_el)

    }

    this.resetBoard = function() {

      // Arrays are sooo much nicer to handle than NodeLists
      var token_el_list = document.querySelectorAll("#container .token"),
          token_el_array = Array.prototype.slice.call(token_el_list)

      token_el_array.forEach(function(token_el, i) {

        var new_top = self._container.offsetTop + self._container.offsetHeight
        token_el.classList.add("removal")

        setTimeout(function() { token_el.style.top = new_top+"px" }, 50 + i*10)
        setTimeout(function() { self._container.removeChild(token_el) }, 1050 + i*10)
      })
    }

    this.renderBoard()

  }

  Renderer.prototype = {

    get width() {
      return this._board.width
    },

    get height() {
      return this._board.height
    },

    get container() {
      return this._container
    }

  }

  return Renderer
})
