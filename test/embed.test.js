import test from 'tape';
import url from '../index';

test('basic emdeb', t => {
    var value = {
        space: {
            id: 'eq.1',
            select: ['*', {
                level: {
                    select: ['*']
                }
            }]
        }
    };

    t.equal(url(value), 'space?select=*,level{*}&id=eq.1');
    t.end();
});

test('basic emdeb with empty select', t => {
    var value = {
        space: {
            id: 'eq.1',
            select: ['*', {
                level: {
                    id: 'eq.1'
                }
            }]
        }
    };

    t.equal(url(value), 'space?select=*,level{*}&id=eq.1&level.id=eq.1');
    t.end();
});

test('composable', t => {
    var space = {
        space: {
            id: 'eq.1',
            select: ['*']
        }
    };

    var level = {
        level: {
            id: 'eq.1'
        }
    };

    var spaceLevel = {
        space: {
            id: 'eq.1',
            select: ['*', level]
        }
    };

    t.plan(3);
    t.equal(url(space), 'space?select=*&id=eq.1');
    t.equal(url(level), 'level?id=eq.1');
    t.equal(url(spaceLevel), 'space?select=*,level{*}&id=eq.1&level.id=eq.1');
});


test('composable with alias', t => {
    var space = {
        space: {
            id: 'eq.1',
            select: ['*']
        }
    };

    var level = {
        'levels:level': {
            id: 'eq.1'
        }
    };

    var spaceLevel = {
        space: {
            id: 'eq.1',
            select: ['*', level]
        }
    };

    t.plan(3);
    t.equal(url(space), 'space?select=*&id=eq.1');
    t.equal(url(level), 'level?id=eq.1');
    t.equal(url(spaceLevel), 'space?select=*,levels:level{*}&id=eq.1&level.id=eq.1');
});

test('embedded limit, order, offset', t => {
    var level = {
        'levels:level': {
            id: 'eq.1',
            limit: 10,
            offset: 3
        }
    };
    var zone = {
        'zones:zone': {
            id: 'eq.1',
            limit: 10,
            offset: 3
        }
    };

    t.plan(3);
    t.equal(
        url({
            space: {
                id: 'eq.1',
                select: ['*', level]
            }
        }),
        'space?select=*,levels:level{*}&id=eq.1&level.id=eq.1&level.limit=10&level.offset=3'
    );
    t.equal(
        url({
            space: {
                id: 'eq.1',
                select: ['*', level, zone]
            }
        }),
        'space?select=*,levels:level{*},zones:zone{*}&id=eq.1&level.id=eq.1&level.limit=10&level.offset=3&zone.id=eq.1&zone.limit=10&zone.offset=3'
    );
    t.equal(
        url({
            space: {
                id: 'eq.1',
                select: ['*', {
                    'levels:level': {
                        id: 'eq.1',
                        limit: 10,
                        offset: 3,
                        order: 'age.asc',
                        select: ['*', zone]
                    }
                }]
            }
        }),
        'space?select=*,levels:level{*,zones:zone{*}}&id=eq.1&level.id=eq.1&level.limit=10&level.offset=3&level.order=age.asc&level.zone.id=eq.1&level.zone.limit=10&level.zone.offset=3'
    );
});

test('select as a string embedded', t => {
    var zone = {
        'zones:zone': {
            select: 'id,name,age',
            id: 'eq.1',
            limit: 10,
            offset: 3
        }
    };

    t.plan(2);
    t.equal(
        url({
            space: {
                id: 'eq.1',
                select: ['*', {
                    'levels:level': {
                        id: 'eq.1',
                        limit: 10,
                        offset: 3,
                        order: 'age.asc',
                        select: ['*', zone]
                    }
                }]
            }
        }),
        'space?select=*,levels:level{*,zones:zone{id,name,age}}&id=eq.1&level.id=eq.1&level.limit=10&level.offset=3&level.order=age.asc&level.zone.id=eq.1&level.zone.limit=10&level.zone.offset=3'
    );
    t.equal(
        url({
            space: {
                id: 'eq.1',
                select: ['*', {
                    'levels:level': {
                        id: 'eq.1',
                        limit: 10,
                        offset: 3,
                        order: 'age.asc',
                        select: 11
                    }
                }]
            }
        }),
        'space?select=*,levels:level{*}&id=eq.1&level.id=eq.1&level.limit=10&level.offset=3&level.order=age.asc',
        'add * for select invalid type');
});
