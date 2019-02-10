var app = angular.module('movies', [])
app.controller('startmovie', function ($rootScope, $scope, $http) {
    $scope.film = "Game";
    $scope.id = null;
   
    $scope.$watch('film', function () {
        $scope.pagenumber = 1;
        
    });
    $scope.movie = null;
    
    $scope.pagenumber = 1;
    
    $scope.click = function () {
        $http({
            url: 'https://api.themoviedb.org/3/search/movie?api_key=94f303903c75b9090f005363c03d8e25&query=' + $scope.film +'&page=' + $scope.pagenumber,
            method: 'GET'
        }).then(function (response) {

            $scope.movie = response.data;
           
            
        }, function (response) {
            alert("Ups!! Entered something in Search box? Or no more pages.");
        }

               );
    };

    

    $scope.previousPage = function () {
        $scope.pagenumber = $scope.pagenumber - 1;
        $scope.click();
    };
    $scope.nextPage = function () {
        $scope.pagenumber = $scope.pagenumber + 1;
        $scope.click();
    };
    $scope.grabmovieinfo = function () {
        $http({
            url: 'https://api.themoviedb.org/3/movie/' + $scope.movie.id +'?api_key=94f303903c75b9090f005363c03d8e25',
            method: 'GET'
    }).then(function(resp){
        $scope.vise = resp.data;
        
        //still in development
    },function(resp){
        alert("No movie data!");
    });
};
});
app.directive('checkImage', function () {
    return {
        link: function (scope, element, attrs) {
            element.bind('error', function () {
                element.attr('src', '/scripts/img/noimage.png'); // set default image if it doesn't exists
            });
        }
    }
});