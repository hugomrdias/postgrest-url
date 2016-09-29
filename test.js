import test from 'ava';
import url from './';

test('basic', t => {
    t.is(url({ space: {} }), 'space?select=&');
});

test.todo('will think about writing this later');
