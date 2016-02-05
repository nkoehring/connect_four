define("app.renderer", function() {


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


  function Renderer(container, board) {

    this._template = {
      board: document.createElement("div"),
      column: document.createElement("div"),
      slot: document.createElement("div")
    }

    this._template.board.className = "board"
    this._template.column.className = "column"
    this._template.slot.className = "slot"

    this._container = container
    this._board = board
    this._first = true    // is this the first render step?

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
    },

    _preRender: function() {

      this._board_el = createBoardDOM(this.width, this.height)
      this._container.appendChild(this._board_el)

    },

    render: function() {

      if (this._first) {
        this._preRender()
      }

      var board = this._board,
          board_el = this._board_el

      console.log("would render")

    }

  }

  return Renderer
})
