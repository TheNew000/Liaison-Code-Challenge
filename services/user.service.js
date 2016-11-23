angular
    .module('gitChallenge', [])
    .service('userService', function() {
        var dataArray = [];

        var findUsers = function(userInput){
            if(userInput.toLowerCase().search('ron') > -1){
                window.location = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
            }else{
                $http.get('https://api.github.com/search/users?q=' + userInput + '&page=1&per_page=10').success(function(data){
                    for (var i = 0; i < data.items.length; i++) {
                        $http.get('https://api.github.com/users/' + data.items[i].login).success(function(userData){
                            if (userData.bio == null){
                                userData.bio = "Sadly our comrade has provided no bio";
                            }
                            if (userData.email == null){
                                userData.email = "This user has requested email privacy";
                            }
                            if (userData.location == null){
                                userData.location = "Parts Unknown!";
                            }
                            var userInfo = {
                                'login': userData.login,
                                'avatar': userData.avatar_url,
                                'bio': userData.bio,
                                'email': userData.email,
                                'location': userData.location
                            };
                            dataArray.push(userInfo);
                        });
                    }
                });
            }
        };
        var getUsers = function(){
            return dataArray;
        };
        return {
            findUsers: findUsers,
            getUsers: getUsers
        };
    });
