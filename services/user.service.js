// This service makes the $http.get() requests to the github API and returns an array filled with the first 10 users to appear based on the user input.
(function () {
    angular
        .module('gitChallenge', [])
        .service('userService', function($http) {
            // A global variable for the service functions to access
            var dataArray = [];
            var findUsers = function(userInput){
                // This clears the array:
                dataArray = [];
                // Here we check if the string includes the characters 'ron' and if so send them to Rick-Rollin' Heaven
                if(userInput.toLowerCase().search('ron') > -1){
                    window.location = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
                }else{
                    // Otherwise we make a call to the github API where we may conveniently set how many pages and responses we'd like without having to write any extra javascript! 
                    $http.get('https://api.github.com/search/users?q=' + userInput + '&page=1&per_page=10').success(function(data){
                        // If successfull we take the login aka username of each object returned and we make a separate call for each to obtain the information needed to populate our user cards
                        for (var i = 0; i < data.items.length; i++) {
                            $http.get('https://api.github.com/users/' + data.items[i].login).success(function(userData){
                                // Instead of populating empty div's I provided some alternative text to show
                                if (userData.bio == null){
                                    userData.bio = "Sadly our comrade has provided no bio";
                                }
                                if (userData.email == null){
                                    userData.email = "This user has requested email privacy";
                                }
                                if (userData.location == null){
                                    userData.location = "Parts Unknown!";
                                }
                                // Here we define the user object
                                var userInfo = {
                                    'login': userData.login,
                                    'avatar': userData.avatar_url,
                                    'bio': userData.bio,
                                    'email': userData.email,
                                    'location': userData.location
                                };
                                //and finally push it to the array
                                dataArray.push(userInfo);
                            });
                        }
                    });
                }
            };
            // This function returns the populated array
            var getUsers = function(){
                return dataArray;
            };
            return {
                findUsers: findUsers,
                getUsers: getUsers
            };
        });
})();
