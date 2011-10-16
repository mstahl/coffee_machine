###
Coffee Machine
coffee_machine.js

Fancy little state machine for Javascript and Coffeescript.

(c) 2011 max thom stahl
###

class Machine
  @current_state = null
  @states = {}
  
  constructor: () ->
  
  state: (options...) ->
    if options.length == 0
      @current_state
    else
      state_name = options[0]
      if options.length == 1
        if @states[state_name]?
          old_state = @current_state
          new_state = state_name
          leaving_value = @states[old_state].onleave()
          @current_state = new_state
          entering_value = @states[@current_state].onenter()
          
          if leaving_value and entering_value
            throw """
                  Each transition must return something, but two callbacks are
                  called between states, so only one may return a value.
                  """
          else
            return leaving_value ? leaving_value : entering_value
        else
          throw """
                Calling Machine.state() with a single string argument, for a 
                state that does not exist, is ambiguous. If you meant to create
                a new state, you must also pass an object.
                """
      else
        attrs = options[1]
        @states[state_name] = {}
        @states[state_name].onenter = attrs.onenter || (->)
        @states[state_name].onleave = attrs.onleave || (->)
  
  