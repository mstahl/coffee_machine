# Coffee Machine

Super simple state machine class, for Coffeescript or Javascript. 

## Usage

To initialize a new state machine:

    var machine = new Machine()

To add a new state:

    machine.state 'grinding'
      'onenter': -> grinder.start()
      'onleave': -> return grounds

You can totally chain any state machine methods together, too. So you can do 
this kind of thing:

    machine.state 'brewing'
      'onenter': -> 
        add_water
        heating_element.start()
      'onleave': ->
        return coffee
    .state 'serving'
      'onleave': -> return pour_coffee()
    .state 'grinding'

To query a machine's state:

    machine.state() # => "grinding"

To transition to a new state:

    machine.state 'brewing'

Either of the `onenter` or `onleave` callbacks may return a value, but both
cannot.