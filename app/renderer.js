define("app.renderer", ["app.toolkit"], function(Toolkit) {

  // great method to write multiline strings!
  // found in x-tag library: http://x-tag.github.io/#getting_started
  var OverlayTemplate = function(){/*
    <div class="wrapper">

      <div id="player1wins">
        <h1>Player 1 wins!</h1>
      </div>

      <div id="player2wins">
        <h1>Player 2 wins!</h1>
      </div>

      <div id="introduction">
        <h1>Connect Four!</h1>
        <p>
          Feel free to configure player colours any time. To play, simply click
          or tap the desired column. Players change automatically.
        </p>
      </div>

      <div id="config">
        <label for="player1">Player 1</label>
        <input id="player1" type="color" value="#FF0000">
        <label for="player2">Player 2</label>
        <input id="player2" type="color" value="#0000FF">
        <input id="start" type="button" value="start">
      </div>

    </div>
  */}


  var isValidCallback = Toolkit.isValidCallback,
      parseTemplateFn = Toolkit.parseTemplateFn


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


  function createColumnDOM(height, clickHandler) {

    var column = document.createElement("div")
    column.className = "column"

    while(height--) {
      column.appendChild( createSlotDOM() )
    }

    if (isValidCallback(clickHandler)) {
      column.addEventListener("click", clickHandler)
    }

    return column
    
  }


  function createBoardDOM(width, height, clickHandler) {

    var board = document.createElement("div")

    board.className = "board"

    for(var c = 0; c < width; c++) { // pun alarm!
      board.appendChild(
        createColumnDOM(height, clickHandler.bind(c))
      )
    }

    return board
    
  }


  function createOverlayDOM(clickHandler) {

    var overlay = document.createElement("div"),
        player1_input,
        player2_input,
        start_el

    overlay.id = "overlay"

    //TODO: Ugly. But is this worth using a templating engine?
    overlay.innerHTML = parseTemplateFn(OverlayTemplate)

    player1_input = overlay.querySelector("#player1")
    player2_input = overlay.querySelector("#player2")
    start_el = overlay.querySelector("#start")

    if (isValidCallback(clickHandler)) {
      start_el.addEventListener("click", function(evt) {
        clickHandler(player1_input.value, player2_input.value)
      })
    }

    return overlay

  }


  function Renderer(container, board, onColumnClick, onStartClick) {

    var self = this

    this._container = container
    this._board = board

    this.renderBoard = function() {

      self._board_el = createBoardDOM(self.width, self.height, onColumnClick)
      self._container.appendChild(self._board_el)

      self._overlay_el = createOverlayDOM(onStartClick)
      self._container.appendChild(self._overlay_el)

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


    this.hideOverlay = function() {

      var class_list = this._overlay_el.classList

      class_list.remove("player1wins")
      class_list.remove("player2wins")
      class_list.add("game-mode")

    }

    this.showPlayer1wins = function() {

      var class_list = this._overlay_el.classList

      class_list.remove("game-mode")
      class_list.remove("player2wins")
      class_list.add("player1wins")

    }

    this.showPlayer2wins = function() {

      var class_list = this._overlay_el.classList

      class_list.remove("game-mode")
      class_list.remove("player1wins")
      class_list.add("player2wins")

    }

    this.toggleOverlay = function() {
      this._overlay_el.classList.toggle("game-mode")
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
