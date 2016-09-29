export default function url(schema) {
    var table = Object.keys(schema)[0];
    var params = [];
    var select = [];
    var level = '';

    embed(schema, params, select, level, 0);

    return table + '?select=' + select.join(',') + '&' + params.join('&');
}

function embed(obj, params, select, level, levelIndex) {
    var table = Object.keys(obj)[0];
    var schema = obj[table];
    var alias = table.split(':');
    var currentSelect = [];

    if (levelIndex > 0) {
        if (alias.length === 2) {
            level += alias[1] + '.';
        } else {
            level += table + '.';
        }
    }

    Object.keys(schema).forEach(function(key) {
        switch (key) {
            case 'order':
                params.push(level + 'order=' + schema[key]);
                break;
            case 'limit':
                params.push(level + 'limit=' + schema[key]);
                break;
            case 'offset':
                params.push(level + 'offset=' + schema[key]);
                break;
            case 'select':
                schema[key].forEach(function(item) {
                    if (typeof item === 'object') {
                        embed(item, params, currentSelect, level, levelIndex + 1);
                    } else {
                        currentSelect.push(item);
                    }
                });

                if (levelIndex > 0) {
                    select.push(table + '{' + currentSelect.join(',') + '}');
                } else {
                    select.push(currentSelect.join(','));
                }
                break;
            default:
                params.push(level + key + '=' + schema[key]);
        }
    });
}
