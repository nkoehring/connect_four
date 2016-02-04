define('test.board', ['app.board'], function(Board) {

  function run() {

    test('Board instance', function() {

      var board = new Board

      ok( board.player_one === "red",           "player one defaults to 'red'" )
      ok( board.player_two === "blue",          "player two defaults to 'blue'" )
      ok( board.columns.length === 7,           "has seven columns" )

      board.player_one = "green"
      board.player_two = "purple"

      ok( board.player_one === "green",         "player one can be changed" )
      ok( board.player_two === "purple",        "player two can be changed" )

      ok( board.current_player === "green",     "starts with player one" )

      board.move(0)
      ok( board.current_player === "purple",    "moves switch player" )
      ok( board.columns[0].length === 1,        "move puts right column" )
      ok( board.columns[0].slots[0] === "green","move puts right player" )

    })

  }

  return {run: run}

})
