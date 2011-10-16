/*
Coffee Machine
coffee_machine.js

Fancy little state machine for Javascript and Coffeescript.

(c) 2011 max thom stahl
*/
var Machine;
var __slice = Array.prototype.slice;
Machine = (function() {
  Machine.current_state = null;
  Machine.states = {};
  function Machine() {}
  Machine.prototype.state = function() {
    var attrs, entering_value, leaving_value, new_state, old_state, options, state_name;
    options = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    if (options.length === 0) {
      return this.current_state;
    } else {
      state_name = options[0];
      if (options.length === 1) {
        if (this.states[state_name] != null) {
          old_state = this.current_state;
          new_state = state_name;
          leaving_value = this.states[old_state].onleave();
          this.current_state = new_state;
          entering_value = this.states[this.current_state].onenter();
          if (leaving_value && entering_value) {
            throw "Each transition must return something, but two callbacks are\ncalled between states, so only one may return a value.";
          } else {
            return leaving_value != null ? leaving_value : {
              leaving_value: entering_value
            };
          }
        } else {
          throw "Calling Machine.state() with a single string argument, for a \nstate that does not exist, is ambiguous. If you meant to create\na new state, you must also pass an object.";
        }
      } else {
        attrs = options[1];
        this.states[state_name] = {};
        this.states[state_name].onenter = attrs.onenter || (function() {});
        return this.states[state_name].onleave = attrs.onleave || (function() {});
      }
    }
  };
  return Machine;
})();