function dayCtrl ($scope, days) {
    $scope.day = days.today;
    $scope.tomorrow = days.tomorrow;
}

class Todo {
    constructor(action, complete) {
        this.action = action;
        this.complete = !!complete;
    }
}

function defaultCtrl($scope) {
    $scope.todos =  [
        new Todo('Get Groceries'),
        new Todo('Call plumber'),
        new Todo('Buy running shoes', true),
        new Todo('Buy flowers'),
        new Todo('Call family'),
    ];
}

module.exports = [dayCtrl, defaultCtrl];