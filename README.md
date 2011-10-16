# Coffee Machine

Super simple state machine class, for Coffeescript or Javascript.

## Usage

To initialize a new state machine:

    var machine = new Machine()

To add a new state:

    machine.state('grinding', {
      'onenter': function () { stop(); },
      'onleave': function () { return go(); }
    })

You can totally chain any state machine methods together, too. So you can do 
this kind of thing:

    machine.state('yellow', {
      'onenter': function () { slow_down(); }
    })
    .state('green', {
      'onenter': function () { go(); },
    })

To query a machine's state:

    machine.state()

To transition to a new state:

    machine.state('red')

Either of the `onenter` or `onleave` callbacks may return a value, but both
cannot.