# postgrest-url [![Build Status](https://travis-ci.org/hugomrdias/postgrest-url.svg?branch=master)](https://travis-ci.org/hugomrdias/postgrest-url) [![codecov](https://codecov.io/gh/hugomrdias/postgrest-url/branch/master/graph/badge.svg)](https://codecov.io/gh/hugomrdias/postgrest-url) [![NPM Version](https://img.shields.io/npm/v/postgrest-url.svg)](https://www.npmjs.com/package/postgrest-url) [![NPM Downloads](https://img.shields.io/npm/dt/postgrest-url.svg)](https://www.npmjs.com/package/postgrest-url) [![NPM License](https://img.shields.io/npm/l/postgrest-url.svg)](https://www.npmjs.com/package/postgrest-url) 
> Build urls for PostgREST

postgrest-url is a small library focused in the construction of urls for [PostgREST](http://postgrest.com/). Based on query definition written in object notation the library outputs a safe url.


## Install

```sh
$ npm install --save postgrest-url
```

## Usage

```js
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

url(level);
// level?id=eq.1&limit=10&offset=3

url(zone);
// zone?id=eq.1&limit=10&offset=3

url({
    space: {
        id: 'eq.1',
        select: ['*', level]
    }
});
// space?select=*,levels:level{*}&id=eq.1&level.id=eq.1&level.limit=10&level.offset=3

url({
    space: {
        id: 'eq.1',
        select: ['*', level, zone]
    }
});

// space?select=*,levels:level{*},zones:zone{*}&id=eq.1&level.id=eq.1&level.limit=10&level.offset=3&zone.id=eq.1&zone.limit=10&zone.offset=3

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
});
// space?select=*,levels:level{*,zones:zone{*}}&id=eq.1&level.id=eq.1&level.limit=10&level.offset=3&level.order=age.asc&level.zone.id=eq.1&level.zone.limit=10&level.zone.offset=3
```
Check the code in the test folder for more.

## Build and test
```sh
npm test -s
# run tests on changes
npm run watch -- -s
```

## Release
https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md#commit   
https://github.com/conventional-changelog/standard-version

```sh
npm run commmit -- -a
npm run release
```

## Todo
- [ ] add docs and examples
- [ ] urlencode where necessary
- [ ] jsonb stuff   
- [ ] add browser test to travis

## License

MIT © [Hugo Dias](http://hugodias.me)
