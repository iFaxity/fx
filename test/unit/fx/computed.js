const { computed } = require('../../../packages/fx/dist');
const { strict: assert } = require('assert');

describe('@kirei/fx', () => {
  describe('computed', () => {
    it('getter', () => {
      const r = computed(() => 'hello');
      assert.equal(r.value, 'hello');
    });

    it('invalid target', () => {
      assert.throws(() => computed('hi'));
      assert.throws(() => computed(null));
      assert.throws(() => computed());
      assert.throws(() => computed(100));
    });

    it('getter and setter', () => {
      let value = 5;
      const get = () => value;
      const set = (v) => { value = v; };
      const r = computed({ get, set });

      // stored value should update on fx.scheduleRun
      // but value variable should update
      assert.equal(r.value, 5);
      r.value = 10;
      assert.equal(r.value, 5);
      assert.equal(value, 10);
    });

    it('toString', () => {
      const r = computed(() => 'test');
      // Implicit and explicit
      assert.equal(r.toString(), 'test');
      assert.equal('' + r, 'test');
    });

    it('valueOf', () => {
      const r = computed(() => -10);
      // Implicit and explicit
      assert.equal(r.valueOf(), -10);
      assert.equal(+r, -10);
    });
  });
})
