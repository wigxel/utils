import test from 'tape'
import { buildFromProto } from '../libs/prototypes';

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
  t.notEqual(james, patrick, "Objects are unique");
})