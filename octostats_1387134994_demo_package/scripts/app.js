var app = angular.module("app", []);

app.controller("AppCtrl", function ($http, $scope) {
	$scope.fetchData = function () {
		document.getElementById("displayBlock").className='hidden';
		document.getElementById("throbber").className='throbber';
		document.getElementById("intermediate").className='unhidden';
		document.getElementById("header").className='step';
		var app = this;
		$http.get("https://api.github.com/users/"+$scope.formUsernameText)
			.success(function (data) {
				app.user = data;

				$scope.name=app.user.name;
				$scope.avatar_url=app.user.avatar_url;
				if (app.user.html_url==null) {$scope.html_url="Not Shared";} else {$scope.html_url=app.user.html_url};
				if (app.user.company==null||app.user.company=="") {$scope.company="Not Shared";} else {$scope.company=app.user.company};
				if (app.user.blog==null) {$scope.website="Not Shared";$scope.websiteLink="";} else {$scope.website=app.user.blog;$scope.websiteLink=$scope.website;};
				if (app.user.location==null) {$scope.location="Not Shared";} else {$scope.location=app.user.location;};
				if (app.user.email==null) {$scope.email="Not Shared";$scope.emailLink="";} else {$scope.email=app.user.email;$scope.emailLink="mailto:"+$scope.email;};
				if (app.user.hireable) {var hireStatus="Yes"} else {var hireStatus="No"};
				$scope.hireable=hireStatus;
				$scope.public_repos=app.user.public_repos;
				$scope.public_gists=app.user.public_gists;
				$scope.followers=app.user.followers;
				$scope.following=app.user.following;
				var date = new Date(app.user.created_at);
				$scope.created_at=date.getDate()+"/"+date.getMonth()+"/"+date.getFullYear();
				
				//Display Block Functions
				document.getElementById("throbber").className='hidden';
				document.getElementById("displayBlock").className='unhidden';
				document.getElementById("header").className='';
			})
			.error(function () {
				document.getElementById("intermediate").className='hidden';
				document.getElementById("header").className='initial';
				alert("Hmm.... That doesn't look quite right!\n\nOctoStats couldn't find the User's data on GitHub! :-/")
			})
	}
})
