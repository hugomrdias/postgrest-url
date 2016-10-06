import test from 'tape';
import url from '../index';

test('empty input', t => {
    t.equal(url({}), '');
    t.end();
});

test('table with empty input', t => {
    t.equal(url({ space: '' }), 'space');
    t.end();
});

test('only select', t => {
    t.equal(url(
        {
            space: {
                select: ['*']
            }
        }
    ), 'space?select=*');
    t.end();
});
test('only params', t => {
    t.equal(url(
        {
            space: {
                id: ['eq.1']
            }
        }
    ), 'space?id=eq.1');
    t.end();
});

test('order', t => {
    t.equal(url(
        {
            space: {
                order: ['id.desc']
            }
        }
    ), 'space?order=id.desc');
    t.end();
});

test('limit', t => {
    t.equal(url(
        {
            space: {
                limit: 10
            }
        }
    ), 'space?limit=10');
    t.end();
});

test('offset', t => {
    t.equal(url(
        {
            space: {
                offset: 10
            }
        }
    ), 'space?offset=10');
    t.end();
});

test('allow only integer for offset/limit', t => {
    t.plan(5);

    t.throws(() => {
        url({
            space: {
                offset: [0],
                limit: 100
            }
        });
    }, TypeError, 'array should throw');

    t.throws(() => {
        url({
            space: {
                offset: 100,
                limit: { dd: 0 }
            }
        });
    }, TypeError, 'object should throw');

    t.throws(() => {
        url({
            space: {
                offset: Infinity,
                limit: '100'
            }
        });
    }, TypeError);

    t.throws(() => {
        url({
            space: {
                offset: 1200.1,
                limit: '000'
            }
        });
    }, TypeError);

    t.throws(() => {
        url({
            space: {
                offset: 1200.0,
                limit: '000'
            }
        });
    }, TypeError);
});

test('order', t => {
    t.plan(3);
    t.throws(() => {
        url({
            space: {
                order: 100
            }
        });
    }, TypeError);

    t.equal(url({
        space: {
            order: 'age.asc'
        }
    }), 'space?order=age.asc', 'string input');

    t.equal(url({
        space: {
            order: ['age.asc', 'name.desc']
        }
    }), 'space?order=age.asc,name.desc', 'array input');
});

test('select as a string', t => {
    t.plan(2);

    t.equal(url({
        space: {
            select: 'id,name,age'
        }
    }), 'space?select=id,name,age');

    t.equal(url({
        space: {
            select: ['id', 'name,age']
        }
    }), 'space?select=id,name,age');
});
