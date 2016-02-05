include(['app.board', 'app.renderer'], function(Board, Renderer) {

  var container = document.getElementById("container"),
      renderer,
      board

  if(container === null) {

    container = document.createElement("div")
    container.id = "container"
    document.body.appendChild(container)

  }

  board = new Board(7,6)
  renderer = new Renderer(container, board)

  board.move_callback = renderer.renderToken

  setTimeout(function() { board.move(3) }, 1000)
  setTimeout(function() { board.move(2) }, 2000)
  setTimeout(function() { board.move(3) }, 3000)
  setTimeout(function() { board.move(1) }, 4000)
  setTimeout(function() { board.move(0) }, 5000)
  setTimeout(function() { board.move(0) }, 6000)

})

