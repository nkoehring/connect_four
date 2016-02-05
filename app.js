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

  renderer.render()

})

