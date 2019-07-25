function authCtrl($scope, $http, $location, authUrl) {
    $scope.authenticate = function (username, password) {
        $http.post(authUrl,
            { username, password },
            { withCredentials: true }
        )
            .then(_ => $location.path('/main'))
            .catch(err => $scope.authenticationError = err);
    }
}

module.exports = [authCtrl];