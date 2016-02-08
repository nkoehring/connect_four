include(['app.board', 'app.renderer'], function(Board, Renderer) {

  var COLUMN_COUNT = 7,
      COLUMN_HEIGHT = 6

  var container = document.getElementById("container"),
      presentation_mode = true,
      presentation_timeout,
      renderer,
      board

  if(container === null) {

    container = document.createElement("div")
    container.id = "container"
    document.body.appendChild(container)

  }

  board = new Board(COLUMN_COUNT, COLUMN_HEIGHT)
  renderer = new Renderer(container, board, onColumnClick, onStartClick)

  board.move_callback = renderer.renderToken
  board.clear_callback = renderer.resetBoard

  board.winning_callback = function(player) {

    if (presentation_mode) {

      stopPresentation()
      startPresentation(2000)

    } else {

      if (player === 0) {
        renderer.showPlayer1wins()
      } else {
        renderer.showPlayer2wins()
      }

      document.getElementById("start").value = "play again"

    }

  }


  function onColumnClick() {
    board.move(this)
  }


  function onStartClick() {

    var player1_color = document.getElementById("player1").value,
        player2_color = document.getElementById("player2").value

    board.player_one = player1_color
    board.player_two = player2_color

    if (presentation_mode) {
      stopPresentation(true)
    } else {
      board.clear()
    }

    document.getElementById("start").value = "reset"

    renderer.hideOverlay()

  }


  function startPresentation(t) {

    if (!t && t !== 0) {
      t = 0
    }

    setTimeout(function() {
      presentation_mode = true
      board.clear()
      presentationStep()
    }, t)

  }


  function stopPresentation(clear_board) {

    presentation_mode = false
    clearTimeout(presentation_timeout)

    if (clear_board) {
      board.clear()
    }

  }


  function presentationStep() {

    if(board.full) {
      stopPresentation()
    }

    var next_column = Math.round(Math.random()*10) % COLUMN_COUNT
    board.move(next_column)
    
    if(presentation_mode) {
      presentation_timeout = setTimeout(function() { presentationStep() }, 500)
    }

  }

  startPresentation(1000)

})

