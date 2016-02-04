define('test.column', ['app.column'], function(Column) {

  function run() {

    test('Column instance', function() {

      var HEIGHT = 3


      var column = new Column(HEIGHT),
          allSlotsEmpty = [null, null, null],
          firstSlotSet = ["X", null, null],
          allSlotsSet = ["X", "Y", "X"]

      ok( column.length === 0,              "is initially empty" )
      ok( eq(column.slots, allSlotsEmpty),  "slots is a null array" )
      ok( column.insert("X") === 1,         "insert returns new slot length" )
      ok( eq(column.slots, firstSlotSet),   "slots are filled with nulls" )

      column.insert("Y")
      column.insert("X")

      ok( eq(column.slots, allSlotsSet),    "slots represent player info" )
      ok( column.insert("Z") === false,     "insert returns false if full" )
      ok( eq(column.slots, allSlotsSet),    "slots don't overfill" )
      ok( column.full,                      "shows if it is full" )

      var column5 = new Column(5),
          fiveEmptySlots = [null, null, null, null, null]

      ok( eq(column5.slots, fiveEmptySlots), "slot amount is respected" )
      
    })

  }

  return {run: run}

})
