define('test.board', ['app.board'], function(Board) {

  function run() {

    test('Board instance', function() {

      var WIDTH = 3,
          HEIGHT = 2,
          board = new Board(WIDTH, HEIGHT),
          twoSlots = [null, null],
          callback = spy(),
          move_args = [0, HEIGHT - 1, "green"]

      ok( board.player_one === "red",           "player one defaults to 'red'" )
      ok( board.player_two === "blue",          "player two defaults to 'blue'" )
      ok( board.columns.length === WIDTH,       "has configured amount of columns" )
      ok( eq(board.columns[0].slots, twoSlots), "has configured amount of slots" )

      board.player_one = "green"
      board.player_two = "purple"

      ok( board.player_one === "green",         "player one can be changed" )
      ok( board.player_two === "purple",        "player two can be changed" )
      ok( board.current_player === "green",     "starts with player one" )

      board.move_callback = callback
      board.clear_callback = callback

      ok( eq(board.move_callback, callback),    "sets move callback" )
      ok( eq(board.clear_callback, callback),   "sets clear callback" )

      board.move(0)

      ok( callback.called,                      "calls move callback" )
      ok( eq(callback.called[0], move_args),    "calls move callback with correct arguments" )
      ok( board.current_player === "purple",    "moves switch player" )
      ok( board.columns[0].length === 1,        "move puts right column" )
      ok( board.columns[0].slots[0] === "green","move puts right player" )

      board.clear()

      ok( callback.called.length === 2,         "calls clear callback" )
      ok( board.columns[0].length === 0,        "clear actually clears" )
      ok( board.current_player === "green",     "clear resets player" )

    })

  }

  return {run: run}

})
