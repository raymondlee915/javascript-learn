var  assert = console.log;

function* NinjaGenerator(action) {
  const imposter = yield 'Hattori ' + action;
  assert(imposter === 'Hanzo', 'The generator has been infiltrated');
  yield 'Yoshi (' + imposter + ') ' + action;
}
const ninjaIterator = NinjaGenerator('skulk');
const result1 = ninjaIterator.next();
assert(result1.value === 'Hattori skulk', 'Hattori is skulking');

const result2 = ninjaIterator.next('Hanzo');
assert(result2.value === 'Yoshi (Hanzo) skulk', 'We have an imposter!');