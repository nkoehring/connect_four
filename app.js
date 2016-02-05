include(['app.board', 'app.renderer'], function(Board, Renderer) {

  var COLUMN_COUNT = 7,
      COLUMN_HEIGHT = 6

  var container = document.getElementById("container"),
      presentation_mode = true,
      renderer,
      board

  if(container === null) {

    container = document.createElement("div")
    container.id = "container"
    document.body.appendChild(container)

  }

  board = new Board(COLUMN_COUNT, COLUMN_HEIGHT)
  renderer = new Renderer(container, board)

  board.move_callback = renderer.renderToken
  board.clear_callback = renderer.resetBoard

  function presentationStep() {

    if(board.full) {
      board.clear()
    }

    var next_column = Math.round(Math.random()*10) % COLUMN_COUNT
    board.move(next_column)
    
    if(presentation_mode) {
      setTimeout(function() { presentationStep() }, 500)
    }

  }

  presentationStep()

})

