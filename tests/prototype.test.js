import test from 'tape'
import { buildFromProto, Editable, Checkable, hasPrice, Visibility } from '../libs/prototypes';
import { trace, log } from '../libs/debuggers';
import { hasProp } from '../libs/helpers';
 

test('Prototype matches', (t) => {
  const proto = {
    getName() {
      return this.name;
    },
    getAge() {
      return this.age;
    }
  }

  const james = buildFromProto(proto, { 
  	name: "James Franco", age: 30 
  })
  const patrick = buildFromProto(proto, { 
  	name: "Patrick John", age: 23 
  })

  t.plan(2)
  t.deepEqual(james.getAge, patrick.getAge, "The methods are identical");
  t.notEqual(james, patrick, "No mutation");
})

test('Edit interface works', (t) => {
  const item = Editable({ name: 'Carrot', edit: true })
  t.equal(item.edit, true, "Overwrites the default (false)");
  item.toggleEdit();
  t.equal(item.edit, false, "Toggle works");
  t.equal(Editable({}).edit, false, "is false by default");
  t.throws(() => {
    Editable(null)
    Editable(items.propDoesNotExits)
  }, 'data is not null') 

  t.end();
})

test("Visibility interface", t => {
  const item = Visibility({ name: "Carrot", visible: false });
  t.equal(item.visible, false, "Overwrites the default (false)");
  item.toggleVisibility()
  t.equal(item.visible, true, "Toggle works");
  t.equal(Visibility({}).visible, true, "is false by default");
  t.throws(() => Visibility(null), "data is not null"); 

  t.end();
});

test("Check interface works", t => {
  const item = Checkable({ name: "Carrot", checked: true });
  t.equal(item.checked, true, "Overwrites the default (false)");
  item.toggleCheck()
  t.equal(item.checked, false, "Toggle works");
  t.equal(Checkable({}).checked, false, "is false by default");
  t.throws(() => Checkable(null), "data is not null"); 

  t.end();
});

test('hasPrice interface', t => {
  const basePrice = 209839203.23939;
  const item = hasPrice({ 
    price: { dollars: basePrice },
    getPrice() { 
      return this.price.dollars;
    }, 
  });
 
  t.deepEqual(item.getPrice(), basePrice, 'price should be equivalent')
  t.deepEqual(item.getFormattedPrice(), '209,839,203.24', 'formatted price should match');
  t.throws(() => hasPrice({ }), 'should requires price property');
  t.throws( 
    () => hasPrice({ getPrice: 30 }), 
    'getPrice must be method', 
    /to be a Function/
  );
  t.end()
});