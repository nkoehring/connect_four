include('test.column', ['app.column'], function(Column) {

  function run() {

    test('Column instance', function() {

      var column = new Column,
          allSlotsEmpty = [null, null, null, null, null, null],
          firstSlotSet = ["X", null, null, null, null, null],
          allSlotsSet = ["X", "Y", "Y", "X", "X", "Y"]

      ok( column.length === 0,              "is initially empty" )
      ok( eq(column.slots, allSlotsEmpty),  "slots is a null array" )
      ok( column.insert("X") === 1,         "insert returns new slot length" )
      ok( eq(column.slots, firstSlotSet),   "slots are filled with nulls" )

      column.insert("Y")
      column.insert("Y")
      column.insert("X")
      column.insert("X")
      column.insert("Y")

      ok( eq(column.slots, allSlotsSet),    "slots represent player info" )
      ok( column.insert("Z") === false,     "insert returns false if full" )
      ok( eq(column.slots, allSlotsSet),    "slots don't overfill" )
      
    })

  }

  return {run: run}

})
