(function () {
    angular
        .module('gitChallenge', [])
        .controller('gcCtrl', function gcCtrl($scope, $http, $q) {
            $scope.getUsers = function(){
                var dataArray = [];
                $http.get('https://api.github.com/search/users?q=' + $scope.userInput + '&page=1&per_page=10').success(function(response){
                    for (var i = 0; i < response.items.length; i++) {
                        var userInfo = {
                            'login': response.items[i].login,
                            'avatar': response.items[i].avatar_url
                        };
                        dataArray.push(userInfo);
                    }
                    $scope.results = dataArray;
                    for (var i = 0; i < dataArray.length; i++) {
                        $http.get('https://api.github.com/users/' + dataArray[i].login).success(function(userData){
                            dataArray[i]['bio'] = userData.bio;
                            dataArray[i]['email'] = userData.email;
                            dataArray[i]['location'] = userData.location;
                            dataArray[i]['index'] = i;
                        });
                    }
                });
            }
        });
})();

app.controller("AppCtrl", function ($scope, $http, $q) {

  $q.all([
    $http.get('/someUrl1'),
    $http.get('/someUrl2')
  ]).then(function(results) {
     /* your logic here */
  });
}
