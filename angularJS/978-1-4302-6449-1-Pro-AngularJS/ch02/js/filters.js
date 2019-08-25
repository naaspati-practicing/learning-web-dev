
function uniqueFilter() {
    return function (data, propertyName) {
        if (Array.isArray(data) && angular.isString(propertyName)) {
            const set = new Set();
            return data
                .filter(object => {
                    const val = object[propertyName];
                    if (set.has(val))
                        return false;

                    set.add(val);
                    return true;
                });
        } else {
            return data;
        }
    }
}

function rangeFilter($filter) {
    return function (data, page, size) {
        if (angular.isArray(data) && angular.isNumber(page) && angular.isNumber(size)) {
            const start_index = (page - 1) * size;
            if (data.length < start_index)
                return [];
            else
                return $filter("limitTo")(data.splice(start_index), size);
        } else {
            return data;
        }
    }
}

function pageCountFilter() {
    return function (data, size) {
        if (angular.isArray(data) && angular.isNumber(size)) {
            const len = Math.ceil(data.length / size);
            const result = [];
            for (let i = 0; i < len; i++)
                result.push(i);

            return result;
        } else {
            return data;
        }
    }
}


module.exports = [
    uniqueFilter,
    rangeFilter,
    pageCountFilter
];