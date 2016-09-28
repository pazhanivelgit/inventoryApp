//var clientHost = 'http://localhost:8080/pw/v1';
//var clientHost = 'http://10.252.76.141:3009/pw/v1';
var clientHost = '/pw/v1';
var selectedclient = '';
var selectedcusid = '';
var selectedprojectId = '';
var selectedcusFolder = '';
var selected_cus_box_root_folder_id = '';
var selected_cus_all_users_folder_id = '';
var selected_project_folder_id = '';
var projectHeroImage = '';
var projectScheduleFile = '';
var projectBudgetFile = '';
var projectGoalsFile = '';

var notofyLinkFile = '';
var profileFolder = '11106615807';

var photographImage = '';

var projectSaveType = 'Save';
var submitted = 'false';


	// create the module and name it pwbp
	var pwbp = angular.module('pwbp', ['ngRoute','ngDialog'] );
	
	
	
	// configure our routes
	pwbp.config(function($routeProvider) {
		$routeProvider

			// route for the Customersetup page
			.when('/', {
				templateUrl : 'pages/Customersetup.html',
				controller  : 'mainController'
			})

			// route for the projectsetup
			.when('/projectsetup', {
				templateUrl : 'pages/projectsetup.html',
				controller  : 'projectsetupController'
			})
			
			// route for the pwteamsetup page
			 .when('/pwteamsetup', {
				templateUrl : 'pages/pwteamsetup.html',
				controller  : 'pwteamsetupcontroller'
				
			})
			
			// route for the customerteamsetup page
			 .when('/custeamsetup', {
				templateUrl : 'pages/custeamsetup.html',
				controller  : 'custeamsetupcontroller'
				
			})
			
			// route for the eprojectlist page
			.when('/eprojectlist', {
				templateUrl : 'pages/eprojectlist.html',
				controller  : 'eprojectlistController'
			})
			
			// route for the ecustomerlist page
			.when('/ecustomerlist', {
				templateUrl : 'pages/customerList.html',
				controller  : 'ecustomerlistController'
    });
			
		

	});
	
	pwbp.config(['ngDialogProvider', function (ngDialogProvider) {
            ngDialogProvider.setDefaults({
                className: 'ngdialog-theme-default',
                plain: false,
                showClose: true,
                closeByDocument: true,
                closeByEscape: true,
                appendTo: false,
                preCloseCallback: function () {
                    console.log('default pre-close callback');
                }
            });
        }]);
		
		
		
		
		
		

// customername and id create save controller ----------------------------------------------------
	
	pwbp.controller('customersavecontroller', function ($scope, ngDialog, $http, $window) {
		
		
        $scope.save = function () {
			$('#cusmsg').html(" ");	
			$scope.customerSaved=true;	
			if($scope.customer_name && $scope.customer_id) { 
				$scope.customerSaved=false;
			// use $.param jQuery function to serialize data from JSON 
			   window.cusid=$scope.customer_id;

			var data = {};
			data.customer_name = $scope.customer_name;
			data.customer_id = $scope.customer_id; 

				var config = {
					headers : {
						'Content-Type': 'application/json'
					}
				}
				//alert(JSON.stringify(data));
				$http.post(clientHost+'/customers', data, config)
				.success(function (data, status, headers, config) {
					$scope.customer_name = '';
					$scope.customer_id = '';
					$('#cusmsg').html("Customer Saved Successfully.");
					//$scope.customerSaved=false;
					
					//alert('working now');
					$scope.$apply(function(){
	           			 $scope.customerSaved = false;
	       			 });
	
					setTimeout(function(){
						$('#cusmsg').html("");
					}, 2000);
					
				})
				.error( function(response, status) {
					//alert(JSON.stringify(response)+" "+status);
					
					
					$('#cusmsg').html(response.message);
					
					$scope.$apply(function(){
	           			 $scope.customerSaved = false;
	       			 });
	
					
					setTimeout(function(){
						$('#cusmsg').html("");
					}, 2000);
			});
			} 
			
		};
		
		$scope.onlyNumbers = function(event){   
			var keys={
            'up': 38,
            'right': 39,
            'down': 40,
            'left': 37,
            'escape': 27,
            'backspace': 8,
            'tab': 9,
            'enter': 13,
            'del': 46,
            '0': 48,
            '1': 49,
            '2': 50,
            '3': 51,
            '4': 52,
            '5': 53,
            '6': 54,
            '7': 55,
            '8': 56,
            '9': 57
			};
			for(var index in keys) {
				if (!keys.hasOwnProperty(index)) continue;
				if (event.charCode==keys[index]||event.keyCode==keys[index]) {
					return; //default event
				}
			}   
			event.preventDefault();
		}; 
    
	});
	
	//---------------------------- CUSTOMER TEAM SETUP CONTROLLER -------------------------------------
	pwbp.controller('customerteamsavecontroller', function ($scope, ngDialog, $http, $window) {		

		$scope.savecustomermember = function(){   
			
			if($scope.cus_email_address && $scope.cus_name && $scope.cus_role) { 
				var data = {};
				data.email_address = $scope.cus_email_address;
				data.name = $scope.cus_name; 
				data.email_address = $scope.cus_email_address;
				data.role = $scope.cus_role;
				data.user_type = 'customer_team';

				var config = {
					headers : {
						'Content-Type': 'application/json'
					}
				}
				//alert('CUSTOMER TEAM DATA :' + JSON.stringify(data));
				$http.post(clientHost+'/users', data, config)
				.success(function (data, status, headers, config) {
					$('#cussuccess').html("Customer Team Saved Successfully.");
						
				})
				
				.error( function(response, status) {
					alert(JSON.stringify(response)+" "+status);
				});
			}
			
		};
    
	});
	
	//---------------------------- PERKINS+WILL TEAM SETUP CONTROLLER -------------------------------------
	
	pwbp.controller('pwprojectteamsavecontroller', function($scope, ngDialog, $http, $window) {		
		
		$scope.savepwteamuser = function(){   

			var data = {};
			data.user_name = $scope.email_address;
			data.name = $scope.name; 
			data.email_addresse = $scope.email_address;
			data.group = $scope.group;
			data.phone_number = $scope.phone_number;
			data.photograph = photographImage;
			data.user_type = 'project_team';
			data.title = $scope.tile;
			
			

			var config = {
				headers : {
					'Content-Type': 'application/json'
				}
			}
			//alert('CUSTOMER TEAM DATA :' + JSON.stringify(data));
			$http.post(clientHost+'/users', data, config)
			.success(function (data, status, headers, config) {
				$('#pwptsuccess').html("Perkin + will Team Saved Successfully.");	
					setTimeout(function(){
						$('#pwptsuccess').html("");
					}, 2000);				
				//$scope.email_address = '';
				//$scope.name = '';
				//$scope.group = '';
				//$scope.phone_number = '';
				
			})
			
			.error( function(response, status) {
				alert(JSON.stringify(response)+" "+status);
			});
			
		};
	});
	
	// tab:1 customerdetails list combo box controller in project details tab --------------------------------------------------------------------------
	
	pwbp.controller('customerlistcontroller', function ($scope, ngDialog, $http) {
    
		$http.get(clientHost+'/customers')
			
            .success(function (data) {
					
				$scope.cuslist=data.entries;
				//alert('testting is process'+ cuslist);
            })
			.error( function(response) {
				//alert('error');
				
   		});
	});	
	
	
	// Projects users list available team member --------------------------------------------------------------------------
	
	pwbp.controller('availpwtcontroller', function ($scope, ngDialog, $http, pwtavm) {
    	
		/*$scope.pwtmember = [
    {
        "user_name": "bjones@perkinswill.com",
        "password": "password1",
        "customer_id": 101010,
        "box_user_id": "NA",
        "name": "Bobby James",
        "auth0_user_id": "222240",
        "title": "CEO",
        "email_address": "bjones@perkinswill.com",
        "photograph": "box.com/diud389u3949",
        "phone_number": "1-626-282-8338",
        "group": "Owners",
        "role": "NA",
        "box_profile_id": "NA",
        "user_type": "project_team",
        "user_id": 100006,
        "is_assigned": "false",
        "box_group_membership_id": "NA",
        "box_app_user_id": "NA"
    },
    {
        "user_name": "susansmith@perkinswill.com",
        "password": "password1",
        "customer_id": 101010,
        "box_user_id": "NA",
        "name": "Susan Smithe",
        "auth0_user_id": "222241",
        "title": "Project Manager",
        "email_address": "susansmith@perkinswill.com",
        "photograph": "box.com/diud33ed33942",
        "phone_number": "1-326-222-3338",
        "group": "Architects",
        "role": "NA",
        "box_profile_id": "NA",
        "user_type": "project_team",
        "user_id": 100007,
        "is_assigned": "false",
        "box_group_membership_id": "NA",
        "box_app_user_id": "NA"
    }
]
;
		
	
	
		$http.get(clientHost+'/users/projectuser')
			
            .success(function (data) {
					
				//$scope.pwtmember = data;
				//alert('testting is process'+ cuslist);
            })
			.error( function(response) {
				alert('error');
				
   		});*/
	});	
	
	pwbp.factory('pwtavm', function(){
		var arr=[];
  		return {arr};
	});
	
	
	// Customer team list available members --------------------------------------------------------------------------
	
	pwbp.controller('availcusteamcontroller', function ($scope, ngDialog, $http, cusAteam) {
		
		
		/*$scope.addcusmember = [
    {
        "user_name": "bjonesgres@boa.com",
        "password": "password1",
        "customer_id": 101010,
        "box_user_id": "NA",
        "name": "Parman Jones",
        "auth0_user_id": "222242",
        "title": "NA",
        "email_address": "bjonesgres@boa.com",
        "photograph": "NA",
        "phone_number": "NA",
        "group": "NA",
        "role": "Executive",
        "box_profile_id": "NA",
        "user_type": "customer_team",
        "user_id": 100004,
        "is_assigned": "false",
        "box_group_membership_id": "NA",
        "box_app_user_id": "2020293"
    },
    {
        "user_name": "msmith@boa.com",
        "password": "password1",
        "customer_id": 101010,
        "box_user_id": "NA",
        "name": "Marker Smithy",
        "auth0_user_id": "222243",
        "title": "NA",
        "email_address": "msmith@boa.com",
        "photograph": "NA",
        "phone_number": "NA",
        "group": "NA",
        "role": "Team Member",
        "box_profile_id": "NA",
        "user_type": "customer_team",
        "user_id": 100005,
        "is_assigned": "false",
        "box_group_membership_id": "NA",
        "box_app_user_id": "2922822"
    }
]
;
		
    	cusAteam.arr.push($scope.addcusmember);	
		
		$http.get(clientHost+'/users/customeruser')
			
            .success(function (data) {
					
				//$scope.addcusmember = data;
				//alert('testting is process'+ cuslist);
            })
			.error( function(response) {
				alert('error');
				
   		});*/
	});	
	
	pwbp.factory('cusAteam', function(){
		var arr=[];
  		return {arr};
	});

	

	
	//---------------------------- Add p+W team Member controller -------------------------
	
	pwbp.controller('addpwtmembercontroller', function($scope, $rootScope, AddNewUserspwt ) {

		$scope.addpwtmember = function(){
		
			//alert("addpwtmember :: ");
			var project_team = {
					name:$scope.name,
					email_address:$scope.email_address,
					tile:$scope.tile,
					photograph:$scope.photograph,
					phone_number:$scope.phone_number,
					group:$scope.group,
									
				};															
				AddNewUserspwt.arr.push(project_team);	
					$scope.closeThisDialog();		
		};
		
		$scope.uploadFile = function(element, elementName) { 
		
		//alert("Upload11")
		
			if(!$scope.project_name || !$scope.project_id) {
				alert('Project Name Or ID can not be empty ');
				return;
				
			}
		
			var data = new FormData();
			
			var file = document.getElementById(elementName).files[0];
			alert('File Upload');
			alert('selected_cus_all_users_folder_id :' + selected_cus_all_users_folder_id)
			//data.append('projectimage', $('#projectimage')[0].files[0]);
			
			var res = file.name.split(".");
			
			if(projectSaveType == 'Save') {
				
				if(!selected_cus_all_users_folder_id) {
					
					var fetchFolderIddata = {};
					
						
					var projectDetails = {				
						project_name : $scope.project_name,
						project_id : $scope.project_id,			
					};
						
					fetchFolderIddata.project_detail = projectDetails;				

					var config = {
						headers : {
							'Content-Type': 'application/json'
						}
					}
				
					$http.post(clientHost+'customers/'+selectedcusid+'/folders/'+selected_cus_box_root_folder_id, fetchFolderIddata, config)
				
						.success(function (fetchFolderIddatareturn, status, headers, config) {
							
						selected_cus_all_users_folder_id = fetchFolderIddatareturn.box_logs.all_users_folder_id;
						
					})
					.error( function(response, status) {
						alert(JSON.stringify(response)+" "+status);
					});
				}
			} else{
				jQuery.ajax({
				url: clientHost +'/upload/'+profileFolder+'?filename='+res[0]+$scope.guid()+"."+res[1],
				type:'post',                                                         
				data: file,
				contentType: false,
				processData: false,
				success: function(response) {
								alert('Success');
								console.log(response);
								
						
					if(elementName == 'projectimage') {
						projectHeroImage = response.box_file_id;
					}
					if(elementName == 'ScheduleFile') {
						projectScheduleFile = response.box_file_id;
					}
					if(elementName == 'BudgetFile') {
						projectBudgetFile = response.box_file_id;
					}
					if(elementName == 'GoalsFile') {
						projectGoalsFile = response.box_file_id;
					}
					if(elementName == 'PhotographImage') {
						photographImage = response.box_file_id;
					}

					
				},
				error: function(jqXHR, textStatus, errorMessage) {
								alert('Error uploading: ' + errorMessage);
				}
			});   
				
			}
			
			
		};
		
		$scope.guid = function () {
		  function s4() {
			return Math.floor((1 + Math.random()) * 0x10000)
			  .toString(16)
			  .substring(1);
		  }
		  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
			s4() + '-' + s4() + s4() + s4();
		};
		
		$scope.onlyNumbers = function(event){   
			var keys={
            'up': 38,
            'right': 39,
            'down': 40,
            'left': 37,
            'escape': 27,
            'backspace': 8,
            'tab': 9,
            'enter': 13,
            'del': 46,
            '0': 48,
            '1': 49,
            '2': 50,
            '3': 51,
            '4': 52,
            '5': 53,
            '6': 54,
            '7': 55,
            '8': 56,
            '9': 57
			};
			for(var index in keys) {
				if (!keys.hasOwnProperty(index)) continue;
				if (event.charCode==keys[index]||event.keyCode==keys[index]) {
					return; //default event
				}
			}   
			event.preventDefault();
		}; 
		
	});	
	
	pwbp.factory('AddNewUserspwt', function(){
		var arr=[];
  		return {arr};
	});

	
	
	//---------------------------- Add Customer team Member controller -------------------------
	
	pwbp.controller('addcustomermembercontroller', function($scope, $rootScope, AddNewUserscus) {
	
		
		$scope.addcustomermember = function(){
		var customer_team = {
				name:$scope.name,
				email_address:$scope.email_address,
				role:$scope.role,								
			};		
			AddNewUserscus.arr.push(customer_team);	
			$scope.closeThisDialog();			
			}			
	});		
	
	pwbp.factory('AddNewUserscus', function(){
		var arr=[];
  		return {arr};
	});	
	
	
	
	
	// ------------------create the controller and inject Angular's $scope----------------------------
	
	pwbp.controller('mainController', function($scope, $rootScope, ngDialog, $timeout, $http,$window,AddNewUserspwt,AddNewUserscus) {
		
		readSelectedUploadedImage = function (input) {
			//alert('Inside On change');
			if (input.files && input.files[0]) {
			var reader = new FileReader();
				reader.onload = function (e) {
					$('#projectdetailsheroimage').attr('src', e.target.result); //- Id of the image element(<img> tag)
				}
				reader.readAsDataURL(input.files[0]);
			}
		};


		$scope.sendInviteEmail = function () {	
		
			//alert('selectedcusid : '+selectedcusid);
			//alert('selectedprojectId : '+selectedprojectId);
			
			var config = {
				headers : {
					'Content-Type': 'application/json'
				}
			}
			$http.post(clientHost+'/customers/' + selectedcusid +'/projects/'+ selectedprojectId + '/send_mail', '', config)
            .success(function (data, status, headers, config) {

				alert('Invite emails has been sent');
            })
			.error( function(response, status) {
				alert(JSON.stringify(response)+" "+status);
			});
					
		};	
		
		
		//-----------------------------------tab section ---------------------------------------------
		
		
		// create a message to display in our view
		$scope.message = 'Customer Setup';
        $rootScope.theme = 'ngdialog-theme-default';	
		$scope.added_teammembers=[]; 
		$scope.added_cuss_teammembers=[];
		$scope.prostatdata=[];
		$scope.goalsstatusdata=[];	
		$scope.notifydata=[];		
		/*$scope.pwtmember=AddNewUserspwt.arr;
		$scope.addcusmember=AddNewUserscus.arr;	*/
		$scope.pwtmember=[];
		$scope.addcusmember=[];
		
		$http.get(clientHost+'/users/customeruser')
			
            .success(function (data) {
					
				$scope.addcusmember = data;
				
            })
			.error( function(response) {
				//alert('error');
   		});
		
		
		$http.get(clientHost+'/users/projectuser')
			
            .success(function (data) {
					
				$scope.pwtmember = data;
				
            })
			.error( function(response) {
				//alert('error');
				
   		});	
		
		$scope.ateam = [];
		this.tab = 1;
        this.setTab = function (tabId) {
            this.tab = tabId;
			$("#saveallButton").attr('title', tabId);
        };
        this.isSet = function (tabId) {
            return this.tab === tabId;
        };	
		
		
		$scope.openDefault = function () {
			ngDialog.open({
				template: 'firstDialogId',
				controller: 'addpwtmembercontroller',
				className: 'ngdialog-theme-default'
			});
		};
		
		$scope.openDefault1 = function () {
			ngDialog.open({
				template: 'firstDialogId1',
				controller: 'addcustomermembercontroller',
				className: 'ngdialog-theme-default'
			});
		};
		
		// combo box selected option change event -----------------------------------
		
		$scope.changeevt = function (selectedCustomer) {

					//alert("Customer id you are selected is" + selectedCustomer.customer_id);
			selectedcusid = selectedCustomer.customer_id;
			
			selectedcusFolder = selectedCustomer.box_root_folder_id;
			
			selected_cus_box_root_folder_id =  selectedCustomer.box_root_folder_id;
				
			//alert('Inside customer Change event');
			$scope.getProjectsList();
			
			/* $http.get(clientHost+'/customers/'+selectedcusid+'/projects')
			
            .success(function (data) {
					
				$scope.projectList=data.entries;
				//alert('testting is process'+ cuslist);
            })
			.error( function(response) {
				//alert('error : ' + JSON.stringify(response));
				
			}); */
					
        };
		
		$scope.getProjectsList = function() {
			//alert('Inside get projects List');
			$http.get(clientHost+'/customers/'+selectedcusid+'/projects')
			
            .success(function (data) {
					
				$scope.projectList=data.entries;
				//alert('testting is process'+ cuslist);
            })
			.error( function(response) {
				//alert('error : ' + JSON.stringify(response));
				
			});
		};
		
		// combo box project Selection
		$scope.changeProjectevt = function (selectedproject) {

			projectSaveType = 'Update';
			
			//alert("Customer id you are selected is" + selectedCustomer.customer_id);
			selectedprojectId = selectedproject.project_id;
			//alert('Project Id :' + selectedprojectId);
			
			$http.get(clientHost+'/customers/'+selectedcusid+'/projects/' + selectedprojectId)
			
            .success(function (data) {
					
				//$scope.projectList=data.entries;
				
				var selectedprojectDetails = data.project_detail;
				//alert('Project Details '+ selectedprojectDetails);
				$scope.project_name = selectedprojectDetails.project_name;
				$scope.project_id = selectedprojectDetails.project_id;
				$scope.project_location = selectedprojectDetails.project_location;
				$scope.project_description = selectedprojectDetails.project_description;
				projectHeroImage = selectedprojectDetails.hero_image
				projectScheduleFile = selectedprojectDetails.schedule_url;
				projectBudgetFile = selectedprojectDetails.budget_url;
				projectGoalsFile = selectedprojectDetails.goals_url;
				selected_project_folder_id = selectedprojectDetails.box_folder_id;
				
				
				$scope.added_teammembers = data.project_team;
				
				//photographImage
				
				$scope.added_cuss_teammembers = data.customer_team;
				
				$scope.notifydata = data.notifications;
				$scope.prostatdata = data.status.phase_collection;
								
				$scope.goalsstatusdata = data.goals;
				
				selected_cus_all_users_folder_id = data.box_logs?data.box_logs.all_users_folder_id:'';
				
				//alert(projectHeroImage);
				document.getElementById("projectdetailsheroimage").src = clientHost+'/images/'+projectHeroImage; 
				
				$('#loaderimg').hide();
				$('#schduleloader').hide();
				$('#budgetloader').hide();
				$('#goalsloaderimg').hide();				
				$('#pronotloaderimg').hide();
				
				$('#succmsgimg').hide();
				$('#schdulesucc').hide();
				$('#bdocsucc').hide();
				$('#goalssucc').hide();
				$('#pronotsucc').hide();
				
				$('#failmsgimg').hide();
				$('#schdulefail').hide();
				$('#bdocfail').hide();
				$('#goalsfail').hide();
				$('#pronotfail').hide();
				
				
				
				if(projectScheduleFile) {
					$('#projectdetailsscheduleFileAvail').show();
					$('#projectdetailsscheduleFile').hide(); 
				} else {
					$('#projectdetailsscheduleFile').show();
					$('#projectdetailsscheduleFileAvail').hide();
				}
				
				if(projectBudgetFile) {
					$('#projectdetailsbudgetFile').hide(); //Default Image
					$('#projectdetailsbudgetFileAvail').show(); 
				} else {
					$('#projectdetailsbudgetFile').show(); //Default Image
					$('#projectdetailsbudgetFileAvail').hide();
				}
				
								
				if(projectGoalsFile) {
					$('#projectdetailsgoalsFile').hide(); //Default Image
					$('#projectdetailsgoalsFileAvail').show(); 
				} else {
					$('#projectdetailsgoalsFile').show(); //Default Image
					$('#projectdetailsgoalsFileAvail').hide();
				}		
				
            })
			.error( function(response) {
				//alert('error : ' + JSON.stringify(response));
				
			});
			
        };
		
		// Finalize setup button event
		$scope.finalizeprojectsetup = function () {
			
			if(!selectedprojectId) {
				selectedprojectId = $scope.project_id
				
			}
			
			//alert('Finalize setup :' + selectedcusid + '-- ' + selectedprojectId);
			var data = {};
			var config = {
                headers : {
                    'Content-Type': 'application/json'
                }
            }
			$('#cusFinalizemsg').html('Finalize setup Processing... ');
			
			$http.post(clientHost+'/customers/' + selectedcusid +'/projects/'+ selectedprojectId + '/finalize_setup', data, config)
            .success(function (data, status, headers, config) {

				//alert('Finalize setup done successfully... ');
				
				$('#cusFinalizemsg').html('Finalize setup done successfully... ');
				setTimeout(function(){
					$('#cusFinalizemsg').html("");
				}, 2000);
            })
			.error( function(response, status) {
				//alert(JSON.stringify(response)+" "+status);
				$('#cusFinalizemsg').html(response.message);
				setTimeout(function(){
					$('#cusFinalizemsg').html("");
				}, 2000);
			});
			
		};
		
		// Clear all fields for adding new Project
		$scope.clearprojectdetails = function () {
			
			projectSaveType = 'Save';
			
			$scope.project_name = '';
			$scope.project_id = '';
			$scope.project_location = '';
			$scope.project_description = '';
			$scope.schedule_url = '';
			$scope.budget_url = '';
			$scope.goals_url = '';
				
			$scope.added_teammembers = {};
			
			$scope.added_cuss_teammembers = {};
				
			$scope.notifydata = {};
			$scope.prostatdata = {};
								
			$scope.goalsstatusdata = {};
			
			$scope.selectedproject = '';
			
			selected_cus_all_users_folder_id = '';
			
			$('#succmsgimg').hide();
			$('#failmsgimg').hide();
			$('#loaderimg').hide();
			
			$('#schdulesucc').hide();
			$('#schdulefail').hide();
			$('#schduleloader').hide();
			$('#projectdetailsscheduleFile').show(); //Default Image
			$('#projectdetailsscheduleFileAvail').hide();
			
			
			
			$('#bdocsucc').hide();
			$('#bdocfail').hide();
			$('#budgetloader').hide();
			$('#projectdetailsbudgetFile').show(); //Default Image
			$('#projectdetailsbudgetFileAvail').hide();
			
			$('#goalssucc').hide();
			$('#goalsfail').hide();
			$('#goalsloaderimg').hide();
			$('#projectdetailsgoalsFile').show(); //Default Image
			$('#projectdetailsgoalsFileAvail').hide();
			
			$('#pronotsucc').hide();
			$('#pronotfail').hide();
			$('#pronotloaderimg').hide();
			//$('#projectdetailsnotificationsFile').show(); //Default Image
			//$('#projectdetailsnotificationsFileAvail').hide();
			
			document.getElementById("projectdetailsheroimage").src = '../images/icon-noimage.png'; 
			
		};
		
		
		// adding functionality for save button ---------------------
		
		
		$scope.saveall = function () {	
		//alert('Testing saveall');
			var myEl = angular.element( document.querySelector( '#saveallButton' ) ); 
			var tabId  = myEl.attr('title');

			/*if(tabId == 1){
				saveCustomerDetails();
			}else{
				alert('tabid alert : '+tabId);
				$scope.saveProjectDetails();
			}*/
			//alert('tabid alert : '+tabId);
			$scope.saveProjectDetails();
					
		};	
		

	//----------------------Project Details-----------------------------------------------				
		
		$scope.saveProjectDetails = function () {
			
		// use $.param jQuery function to serialize data from JSON 	
					
		
			var data = {};	
			//var data = {};			
			var status = {};			
			var overAllProjectStatus = ''; 


			var project_details = {				
					project_name : $scope.project_name,
					project_id : $scope.project_id,
					project_location : $scope.project_location,
					hero_image : projectHeroImage,
					project_description : $scope.project_description,
					schedule_url : projectScheduleFile,
					budget_url : projectBudgetFile,
					goals_url : projectGoalsFile,				
				};
				
				//alert('ProjectDetails Data :' + JSON.stringify(project_details));
			
				
				overAllProjectStatus = $scope.overall_status;			
				status.overall_status = overAllProjectStatus;
				status.phase_collection = $scope.prostatdata;			
				
				
				data.project_detail = project_details;
				data.notifications = $scope.notifydata;
				data.project_team = $scope.added_teammembers;
				data.customer_team = $scope.added_cuss_teammembers;
				data.goals = $scope.goalsstatusdata;
				data.status = status;
				//alert('Status Data :' + JSON.stringify(status)); 

			
			
			JSON.parse(angular.toJson(data));

			//alert('Testing : '+angular.toJson(data));
			
            var config = {
                headers : {
                    'Content-Type': 'application/json'
                }
            }
				//alert(selectedcusid);
			var datatosave = angular.toJson(data);
			//alert('projectSaveType :' + projectSaveType);
			if(projectSaveType == 'Save') {
				//alert('Save');
				$http.post(clientHost+'/customers/'+selectedcusid+'/projects', data, config)
				.success(function (data, status, headers, config) 
				{
					alert('Project Details Saved Successfully... ');
					// Refresh ProjectList Drop Down after ssave
					$scope.getProjectsList();
				})
				.error( function(response, status) {
					
					alert(JSON.stringify(response)+" "+status);
					
				});
			} else {
				//alert('Update');
				data.customer_id = selectedcusid;
				data.project_id = $scope.project_id; 
			
				project_details.box_folder_id = selected_project_folder_id;
			
			
				$http.put(clientHost+'/customers/'+selectedcusid+'/projects', data, config)
				.success(function (data, status, headers, config) 
				{
					//alert('Project Details Saved Successfully... ');
					// Refresh ProjectList Drop Down after ssave
					$scope.getProjectsList();
					$('#cusmsg').html("Project Saved Successfully.");
					
					setTimeout(function(){
						$('#cusmsg').html("");
					}, 2000);
				})
				.error( function(response, status) {
					
					//alert(JSON.stringify(response)+" "+status);
					
				});
			}
			
			
			
			
		};
		
		
		

	//----------------------Project Notification-----------------------------------------------				
		
		
		//$scope.notifydata=[];
		
		$scope.addnotify = function(){
			
		if(document.getElementById('dynbtn').innerHTML=='Add'){	
		
		var postedByVar = {
			username:'admin',
			userimage:'93428920290'
		};
		
		var notify = {

				headlines:$scope.headlines,
				date:$scope.date,
				link:notofyLinkFile,
				text:$scope.text,
				icon_type:$scope.icon_type,
				activity_type:$scope.icon_type,
				postedby: postedByVar

					
			};

			$scope.notifydata.push(notify);

			$scope.headlines=null;
			$scope.date=null;
			$scope.link=null;
			$scope.text=null;
			$scope.icon_type=null;
			
			$scope.$setPristine(true);
			
			}else
				{
				$scope.notifydata[$scope.index].headlines = $scope.headlines;
				$scope.notifydata[$scope.index].date = $scope.date;
				$scope.notifydata[$scope.index].link = notofyLinkFile;
				$scope.notifydata[$scope.index].text = $scope.text;
				$scope.notifydata[$scope.index].icon_type = $scope.icon_type;
				
				document.getElementById('dynbtn').innerHTML='Add';
				
				$scope.headlines=null;
				$scope.date=null;
				$scope.link=null;
				$scope.text=null;
				$scope.icon_type=null;
			}
		}
		
		$scope.nfyeditData = function () {
			
			$scope.headlines=$scope.notifydata[$scope.index].headlines;
			$scope.date=$scope.notifydata[$scope.index].date;
			$scope.link=$scope.notifydata[$scope.index].link;
			$scope.text=$scope.notifydata[$scope.index].text;
			$scope.icon_type=$scope.notifydata[$scope.index].icon_type;
		
			$scope.eData = $scope.notifydata;
			document.getElementById('dynbtn').innerHTML='Update';
			
			
		}

		$scope.selectrow = null;  // initialize our variable to null
  				$scope.setClickedRow = function(index){  //function that sets the value of selectedRow to current index
    			$scope.index=index;
				$scope.selectrow = index;
		}
		
		$scope.removenotifyData = function () {
			
			$scope.notifydata.splice($scope.index, 1); 
			
		}
		
			
			
			
	//----------------------Project Status-----------------------------------------------				
		
		
		//$scope.prostatdata=[];
		$scope.addprojdata = function(){
		if(document.getElementById('projstssbtn').innerHTML=='Add'){
		var prostatus = {
				phase_name:$scope.phase_name,
				completion_date:$scope.completion_date,
				phase_status:$scope.phase_status,
				phase_order:$scope.phase_order
								
			};			
			$scope.prostatdata.push(prostatus);
			
			$scope.phase_name=null;
			$scope.completion_date=null;	
			$scope.phase_status=null;
			$scope.phase_order=null;
			
			$scope.$setPristine(true);			

		}else
		{
				$scope.prostatdata[$scope.index].phase_name = $scope.phase_name;
				$scope.prostatdata[$scope.index].completion_date = $scope.completion_date;
				$scope.prostatdata[$scope.index].phase_status = $scope.phase_status;
				$scope.prostatdata[$scope.index].phase_order = $scope.phase_order;
				
				document.getElementById('projstssbtn').innerHTML='Add';
				
				$scope.phase_name=null;
				$scope.completion_date=null;	
				$scope.phase_status=null;
				$scope.phase_order=null;
			}
		}
		
		$scope.editData = function () {
			
			$scope.phase_name=$scope.prostatdata[$scope.index].phase_name;
			$scope.completion_date=$scope.prostatdata[$scope.index].completion_date;
			$scope.phase_status=$scope.prostatdata[$scope.index].phase_status;
			$scope.phase_order=$scope.prostatdata[$scope.index].phase_order;
		
			$scope.eData = $scope.prostatdata;
			document.getElementById('projstssbtn').innerHTML='Update';
			
			
		}

		/*$scope.selectrow = null;  // initialize our variable to null
  				$scope.setClickedRow = function(index){  //function that sets the value of selectedRow to current index
    			$scope.index=index;
				$scope.selectrow = index;
		}
		*/
		$scope.removeStatusData = function () {
			
			$scope.prostatdata.splice($scope.index, 1); 
			
		}
		
		$scope.overall_status = "Not Started";
		

// date picker script line ------------------------

		$( ".datepicker" ).datepicker();

		
		
		
		
	//----------------------Goals Status-----------------------------------------------				
		
		
		//$scope.goalsstatusdata=[];
		
		$scope.goalsstatus = function(){
		if(document.getElementById('gs-add-btn').innerHTML=='Add'){	
		var goalstate = {
				goal_name:$scope.goal_name,
				date:$scope.date,
				text:$scope.text,	
				icon_type:$scope.icon_type					
			};
			
			$scope.goalsstatusdata.push(goalstate);
			
			$scope.goal_name=null;
			$scope.date=null;
			$scope.text=null;
			$scope.icon_type=null;
			
			$scope.$setPristine(true);	
			
			}else
		{
				$scope.goalsstatusdata[$scope.index].goal_name = $scope.goal_name;
				$scope.goalsstatusdata[$scope.index].date = $scope.date;
				$scope.goalsstatusdata[$scope.index].text = $scope.text;
				$scope.goalsstatusdata[$scope.index].icon_type = $scope.icon_type;
				
				document.getElementById('gs-add-btn').innerHTML='Add';
				
				$scope.goal_name=null;
				$scope.date=null;
				$scope.text=null;
				$scope.icon_type=null;
			}
		}
		
		$scope.goaleditData = function () {
			
			$scope.goal_name=$scope.goalsstatusdata[$scope.index].goal_name;
			$scope.date=$scope.goalsstatusdata[$scope.index].date;
			$scope.text=$scope.goalsstatusdata[$scope.index].text;
			$scope.icon_type=$scope.goalsstatusdata[$scope.index].icon_type;
		
			$scope.eData = $scope.goalsstatusdata;
			document.getElementById('gs-add-btn').innerHTML='Update';
			
			
		}

		
		
		$scope.removegoalData = function () {
			
			$scope.goalsstatusdata.splice($scope.index, 1); 
			
		}	
			

	//----------------------------add pwtmember and remove pwtmember functions teams-----------------------------------------------
	
	
	$scope.addpwteamMember = function(){
                                                
	//alert('Inside Add');
	
	var oTable = document.getElementById('id_availableTeamMembers');
	
	var rowLength = oTable.rows.length;
	debugger
	 //alert('rowLength :' + rowLength);
	 
	if(rowLength > 0) {
		var newTeamMemeber = {
				name:$scope.pwtmember[$scope.index].name,
				email_address:$scope.pwtmember[$scope.index].email_address,
				title:$scope.pwtmember[$scope.index].title,
				photograph:$scope.pwtmember[$scope.index].photograph,
				phone_number:$scope.pwtmember[$scope.index].phone_number,
				group:$scope.pwtmember[$scope.index].group
		};
		
		$scope.added_teammembers.push(newTeamMemeber); 
		$scope.pwtmember.splice($scope.index,1); 
		$scope.selectrow = null;
	}

   }
                                
		$scope.removepwteamMember = function(){
						
				//alert('Inside Remove');
				
				var addedTable = document.getElementById('id_addedTeamMembers');
				
				var rowLength = addedTable.rows.length;
				
				if(rowLength > 0) {
					var removedTeamMemeber = {
							name:$scope.added_teammembers[$scope.index].name,
							email_address:$scope.added_teammembers[$scope.index].email_address,
							tile:$scope.added_teammembers[$scope.index].tile,
							photograph:$scope.added_teammembers[$scope.index].photograph,
							phone_number:$scope.added_teammembers[$scope.index].phone_number,
							group:$scope.added_teammembers[$scope.index].group
					};
					
					$scope.pwtmember.push(removedTeamMemeber); 
					$scope.added_teammembers.splice($scope.index,1); 
					$scope.selectrow = null;
				}

		}
		
		//$scope.selectrow = null;  // initialize our variable to null
  				$scope.setClickedRowadd = function(index){  //function that sets the value of selectedRow to current index
    			$scope.index=index;
				$scope.selectrowadd = index;
		}
		
		//$scope.selectrow = null;  // initialize our variable to null
  				$scope.setClickedRowremove = function(index){  //function that sets the value of selectedRow to current index
    			$scope.index=index;
				$scope.selectrowremove = index;
		}
		
		




	//------------------------------------add cusmember and remove cusmember functions teams----------------------------------------



	$scope.addcusteamMember = function(){
													
		//alert('Inside Add');
		
		var oTable = document.getElementById('id_availablecusTeamMembers');
		
		var rowLength = oTable.rows.length;
		
		 //alert('rowLength :' + rowLength);
		if(rowLength > 0) {
			//alert('$scope.addcusmember' + JSON.stringify($scope.addcusmember));
						var newCusTeamMemeber = {
							
								name:$scope.addcusmember[$scope.index].name,
								email_address:$scope.addcusmember[$scope.index].email_address,
								role:$scope.addcusmember[$scope.index].role,
								
								/*name:'value1',
								email_address:'value2',
								role:'value3'*/
						};
						
						//alert('customer list values!..');
						$scope.added_cuss_teammembers.push(newCusTeamMemeber);
						// alert('hopefully wll doit!');						
						$scope.addcusmember.splice($scope.index,1); 
						$scope.selectrow = null;
		}

   }
                                
		$scope.removecusteamMember = function(){
						
			//alert('Inside Remove');
			
			var addedCustTable = document.getElementById('id_addedCusTeamMembers');
			
			var rowLength = addedCustTable.rows.length;
			
			if(rowLength > 0) {
				var removedTeamMemeber = {
						name:$scope.added_cuss_teammembers[$scope.index].name,
						email_address:$scope.added_cuss_teammembers[$scope.index].email_address,
						role:$scope.added_cuss_teammembers[$scope.index].role,
				};
				
				$scope.addcusmember.push(removedTeamMemeber); 				
				$scope.added_cuss_teammembers.splice($scope.index,1); 
				$scope.selectrow = null;
			}

		}
		
		//$scope.selectrow = null;  // initialize our variable to null
  				$scope.setClickedRowadd = function(index){  //function that sets the value of selectedRow to current index
    			$scope.index=index;
				$scope.selectrowadd = index;
		}
		
		//$scope.selectrow = null;  // initialize our variable to null
  				$scope.setClickedRowremove = function(index){  //function that sets the value of selectedRow to current index
    			$scope.index=index;
				$scope.selectrowremove = index;
		}
		
		//---------------------------- FOR FILE UPLOADING in project Details tab---------------------------------------------
        $scope.uploadUserPhoto = function(element, elementName) { 
		
        $('#photosloaderimg').show();

			var file = document.getElementById(elementName).files[0];
			
			
			var res = file.name.split(".");
			
			
			jQuery.ajax({
				url: clientHost +'/uploadProfilePic/'+profileFolder+'?filename='+res[0]+$scope.guid()+"."+res[1],
				type:'post',                                                         
				data: file,
				contentType: false,
				processData: false,
				success: function(response) {
								//alert('Success');
								console.log(response);
								
                // upload success tick image come here.--------------

                $('#photossucc').show();
                $('#photosfail').hide();
                $('#photosloaderimg').hide();

						
					if(elementName == 'projectimage') {
						projectHeroImage = response.box_file_id;
					}
					if(elementName == 'ScheduleFile') {
						projectScheduleFile = response.box_file_id;
					}
					if(elementName == 'BudgetFile') {
						projectBudgetFile = response.box_file_id;
					}
					if(elementName == 'GoalsFile') {
						projectGoalsFile = response.box_file_id;
					}
					if(elementName == 'PhotographImage') {
						photographImage = response.box_file_id;
					}

					
				},
				error: function(jqXHR, textStatus, errorMessage) {
								alert('Error uploading: ' + errorMessage);


                $('#photossucc').hide();
                $('#photosfail').show();
                $('#photosloaderimg').hide();

				}
			});

		}		
		
		
		//---------------------------- FOR FILE UPLOADING in projdet tab in projsetup menu---------------------------------------------		
		
		
		$scope.uploadFile = function(element, elementName) { 
		
			//alert('File Upload22');
        //$('#loaderimg').show();
		
        if (elementName == 'projectimage') {
            $('#loaderimg').show();
        }
        if (elementName == 'ScheduleFile') {
            $('#schduleloader').show();
        }
        if (elementName == 'BudgetFile') {
            $('#budgetloader').show();
        }
        if (elementName == 'GoalsFile') {
            $('#goalsloaderimg').show();
        }
		if (elementName == 'linkFile') {
            $('#pronotloaderimg').show();
        }

		
			if(!$scope.project_name || !$scope.project_id) {
				alert('Project Name Or ID can not be empty ');
				return;
				
			}
			

			var data = new FormData();
			
			
			//alert('selectedcusid :' + selectedcusid)
			//alert('selected_cus_box_root_folder_id : '+selected_cus_box_root_folder_id)
			//alert('projectSaveType' +projectSaveType)
			
			//alert('File Upload');
			var file = document.getElementById(elementName).files[0];
			//alert('File Name :' + file.name)
			//data.append('projectimage', $('#projectimage')[0].files[0]);
			
			var res = file.name.split(".");
			
			//alert("selected_cus_all_users_folder_id : "+selected_cus_all_users_folder_id);
			
			//alert(projectSaveType);
			//alert(!selected_cus_all_users_folder_id);
			
			if(projectSaveType == 'Save') {
				//alert('inside 1');
				if(!selected_cus_all_users_folder_id) {
					var fetchFolderIddata = {};
					
						
					var projectDetails = {				
						project_name : $scope.project_name,
						project_id : $scope.project_id,			
					};
						
					fetchFolderIddata.project_detail = projectDetails;				

					var config = {
						headers : {
							'Content-Type': 'application/json'
						}
					}
					$http.post(clientHost+'/customers/'+selectedcusid+'/folders/'+selected_cus_box_root_folder_id, fetchFolderIddata, config)
				
						.success(function (fetchFolderIddatareturn, status, headers, config) {
							
						selected_cus_all_users_folder_id = fetchFolderIddatareturn.box_logs.all_users_folder_id;
						selectedcusFolder = fetchFolderIddatareturn.project_detail.box_folder_id;
						
						//alert("Test.................");
						jQuery.ajax({
							url: clientHost +'/upload/'+selected_cus_all_users_folder_id+'?filename='+res[0]+$scope.guid()+"."+res[1],
							type:'post',                                                         
							data: file,
							contentType: false,
							processData: false,
							success: function(response) {
											//alert('Success');
											console.log(response);
											projectSaveType = 'Update';
									
								if(elementName == 'projectimage') {
									projectHeroImage = response.box_file_id;
                                    $('#loaderimg').hide();
                                    $('#succmsgimg').show();
                                    $('#failmsgimg').hide();

								}
								if(elementName == 'ScheduleFile') {
									projectScheduleFile = response.box_file_id;
                                    $('#schduleloader').hide();
                                    $('#schdulesucc').show();
                                    $('#schdulefail').hide();
									
									$("#projectdetailsscheduleFile").hide();
									$("#projectdetailsscheduleFileAvail").show();
									
								}
								if(elementName == 'BudgetFile') {
									projectBudgetFile = response.box_file_id;
                                    $('#budgetloader').hide();
                                    $('#bdocsucc').show();
                                    $('#bdocfail').hide();
									
									$("#projectdetailsbudgetFile").hide();
									$("#projectdetailsbudgetFileAvail").show();
								}
								if(elementName == 'GoalsFile') {
									projectGoalsFile = response.box_file_id;

                                    $('#goalsloaderimg').hide();
                                    $('#goalssucc').show();
                                    $('#goalsfail').hide();
									
									$("#projectdetailsgoalsFile").hide();
									$("#projectdetailsgoalsFileAvail").show();
								}
								if(elementName == 'PhotographImage') {
									photographImage = response.box_file_id;
								}

								if(elementName == 'linkFile') {
									notofyLinkFile = response.box_file_id;
									$('#pronotloaderimg').hide();
                                    $('#pronotsucc').show();
                                    $('#pronotfail').hide();
									
									//$("#projectdetailsnotificationsFile").hide();
									//$("#projectdetailsnotificationsFileAvail").show();
									
								}

								
							},
							error: function(jqXHR, textStatus, errorMessage) {
											//alert('Error uploading: ' + errorMessage);

                                if (elementName == 'projectimage') {
                                    projectHeroImage = response.box_file_id;
                                    $('#loaderimg').hide();
                                    $('#succmsgimg').hide();
                                    $('#failmsgimg').show();

                                }
                                if (elementName == 'ScheduleFile') {
                                    projectScheduleFile = response.box_file_id;
                                    $('#schduleloader').hide();
                                    $('#schdulesucc').hide();
                                    $('#schdulefail').show();									
									
                                }
                                if (elementName == 'BudgetFile') {
                                    projectBudgetFile = response.box_file_id;
                                    $('#budgetloader').hide();
                                    $('#bdocsucc').hide();
                                    $('#bdocfail').show();
                                }
                                if (elementName == 'GoalsFile') {
                                    projectGoalsFile = response.box_file_id;

                                    $('#goalsloaderimg').hide();
                                    $('#goalssucc').hide();
                                    $('#goalsfail').show();
                                }
                                if (elementName == 'PhotographImage') {
                                    photographImage = response.box_file_id;
                                }
								if(elementName == 'linkFile') {
									notofyLinkFile = response.box_file_id;
									$('#pronotloaderimg').hide();
                                    $('#pronotsucc').hide();
                                    $('#pronotfail').show();
									
								}




							}
						}); 
						
					})
					.error( function(response, status) {
						//alert(JSON.stringify(response)+" "+status);


                        if (elementName == 'projectimage') {
                            projectHeroImage = response.box_file_id;
                            $('#loaderimg').hide();
                            $('#succmsgimg').hide();
                            $('#failmsgimg').show();

                        }
                        if (elementName == 'ScheduleFile') {
                            projectScheduleFile = response.box_file_id;
                            $('#schduleloader').hide();
                            $('#schdulesucc').hide();
                            $('#schdulefail').show();
                        }
                        if (elementName == 'BudgetFile') {
                            projectBudgetFile = response.box_file_id;
                            $('#budgetloader').hide();
                            $('#bdocsucc').hide();
                            $('#bdocfail').show();
                        }
                        if (elementName == 'GoalsFile') {
                            projectGoalsFile = response.box_file_id;

                            $('#goalsloaderimg').hide();
                            $('#goalssucc').hide();
                            $('#goalsfail').show();
                        }
                        if (elementName == 'PhotographImage') {
                            photographImage = response.box_file_id;
                        }
						if(elementName == 'linkFile') {
									notofyLinkFile = response.box_file_id;
									$('#pronotloaderimg').hide();
                                    $('#pronotsucc').hide();
                                    $('#pronotfail').show();
									
								}




					});
				}else{
					jQuery.ajax({
							url: clientHost +'/upload/'+selected_cus_all_users_folder_id+'?filename='+res[0]+$scope.guid()+"."+res[1],
							type:'post',                                                         
							data: file,
							contentType: false,
							processData: false,
							success: function(response) {
											//alert('Success');
											console.log(response);
											projectSaveType = 'Update';
									
								if(elementName == 'projectimage') {
									projectHeroImage = response.box_file_id;
                                    $('#loaderimg').hide();
                                    $('#succmsgimg').show();
                                    $('#failmsgimg').hide();

								}
								if(elementName == 'ScheduleFile') {
									projectScheduleFile = response.box_file_id;
                                    $('#schduleloader').hide();
                                    $('#schdulesucc').show();
                                    $('#schdulefail').hide();
									
									$("#projectdetailsscheduleFile").hide();
									$("#projectdetailsscheduleFileAvail").show();
									
								}
								if(elementName == 'BudgetFile') {
									projectBudgetFile = response.box_file_id;
                                    $('#budgetloader').hide();
                                    $('#bdocsucc').show();
                                    $('#bdocfail').hide();
									
									$("#projectdetailsbudgetFile").hide();
									$("#projectdetailsbudgetFileAvail").show();
								}
								if(elementName == 'GoalsFile') {
									projectGoalsFile = response.box_file_id;

                                    $('#goalsloaderimg').hide();
                                    $('#goalssucc').show();
                                    $('#goalsfail').hide();
									
									$("#projectdetailsgoalsFile").hide();
									$("#projectdetailsgoalsFileAvail").show();
								}
								if(elementName == 'PhotographImage') {
									photographImage = response.box_file_id;
								}

								if(elementName == 'linkFile') {
									notofyLinkFile = response.box_file_id;
									$('#pronotloaderimg').hide();
                                    $('#pronotsucc').show();
                                    $('#pronotfail').hide();
									
									//$("#projectdetailsnotificationsFile").hide();
									//$("#projectdetailsnotificationsFileAvail").show();
									
								}
							},
							error: function(jqXHR, textStatus, errorMessage) {
											//alert('Error uploading: ' + errorMessage);


                        if (elementName == 'projectimage') {
                            projectHeroImage = response.box_file_id;
                            $('#loaderimg').hide();
                            $('#succmsgimg').hide();
                            $('#failmsgimg').show();

                        }
                        if (elementName == 'ScheduleFile') {
                            projectScheduleFile = response.box_file_id;
                            $('#schduleloader').hide();
                            $('#schdulesucc').hide();
                            $('#schdulefail').show();
                        }
                        if (elementName == 'BudgetFile') {
                            projectBudgetFile = response.box_file_id;
                            $('#budgetloader').hide();
                            $('#bdocsucc').hide();
                            $('#bdocfail').show();
                        }
                        if (elementName == 'GoalsFile') {
                            projectGoalsFile = response.box_file_id;

                            $('#goalsloaderimg').hide();
                            $('#goalssucc').hide();
                            $('#goalsfail').show();
                        }
                        if (elementName == 'PhotographImage') {
                            photographImage = response.box_file_id;
                        }
						
						if(elementName == 'linkFile') {
							notofyLinkFile = response.box_file_id;
									
							$('#pronotloaderimg').hide();
                            $('#pronotsucc').hide();
                            $('#pronotfail').show();
						}




							}
						}); 
				}
				
				
			} else{
				
				jQuery.ajax({
					url: clientHost +'/upload/'+selected_cus_all_users_folder_id+'?filename='+res[0]+$scope.guid()+"."+res[1],
					type:'post',                                                         
					data: file,
					contentType: false,
					processData: false,
					success: function(response) {
									//alert('Success');
									console.log(response);
									projectSaveType = 'Update';
									
						
						if(elementName == 'projectimage') {
									projectHeroImage = response.box_file_id;
                                    $('#loaderimg').hide();
                                    $('#succmsgimg').show();
                                    $('#failmsgimg').hide();

								}
								if(elementName == 'ScheduleFile') {
									projectScheduleFile = response.box_file_id;
                                    $('#schduleloader').hide();
                                    $('#schdulesucc').show();
                                    $('#schdulefail').hide();
									
									$("#projectdetailsscheduleFile").hide();
									$("#projectdetailsscheduleFileAvail").show();
									
								}
								if(elementName == 'BudgetFile') {
									projectBudgetFile = response.box_file_id;
                                    $('#budgetloader').hide();
                                    $('#bdocsucc').show();
                                    $('#bdocfail').hide();
									
									$("#projectdetailsbudgetFile").hide();
									$("#projectdetailsbudgetFileAvail").show();
								}
								if(elementName == 'GoalsFile') {
									projectGoalsFile = response.box_file_id;

                                    $('#goalsloaderimg').hide();
                                    $('#goalssucc').show();
                                    $('#goalsfail').hide();
									
									$("#projectdetailsgoalsFile").hide();
									$("#projectdetailsgoalsFileAvail").show();
								}
								if(elementName == 'PhotographImage') {
									photographImage = response.box_file_id;
								}

								if(elementName == 'linkFile') {
									notofyLinkFile = response.box_file_id;
									$('#pronotloaderimg').hide();
                                    $('#pronotsucc').show();
                                    $('#pronotfail').hide();
									
									//$("#projectdetailsnotificationsFile").hide();
									//$("#projectdetailsnotificationsFileAvail").show();
									
								}
						
					},
					error: function(jqXHR, textStatus, errorMessage) {
									//alert('Error uploading: ' + errorMessage);


                    if (elementName == 'projectimage') {
                        projectHeroImage = response.box_file_id;
                        $('#loaderimg').hide();
                        $('#succmsgimg').hide();
                        $('#failmsgimg').show();

                    }
                    if (elementName == 'ScheduleFile') {
                        projectScheduleFile = response.box_file_id;
                        $('#schduleloader').hide();
                        $('#schdulesucc').hide();
                        $('#schdulefail').show();
                    }
                    if (elementName == 'BudgetFile') {
                        projectBudgetFile = response.box_file_id;
                        $('#budgetloader').hide();
                        $('#bdocsucc').hide();
                        $('#bdocfail').show();
                    }
                    if (elementName == 'GoalsFile') {
                        projectGoalsFile = response.box_file_id;

                        $('#goalsloaderimg').hide();
                        $('#goalssucc').hide();
                        $('#goalsfail').show();
                    }
                    if (elementName == 'PhotographImage') {
                        photographImage = response.box_file_id;
                    }
					if(elementName == 'linkFile') {
								notofyLinkFile = response.box_file_id;
						
						$('#pronotloaderimg').hide();
                        $('#pronotsucc').hide();
                        $('#pronotfail').show();		
					}




					}
				});  
			}
			
			
			 
		};
		
		$scope.guid = function () {
		  function s4() {
			return Math.floor((1 + Math.random()) * 0x10000)
			  .toString(16)
			  .substring(1);
		  }
		  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
			s4() + '-' + s4() + s4() + s4();
		}

		
		// -- numeric value type code validation------------------------------------------------------
		
		$scope.onlyNumbers = function(event){   
			var keys={
            'up': 38,
            'right': 39,
            'down': 40,
            'left': 37,
            'escape': 27,
            'backspace': 8,
            'tab': 9,
            'enter': 13,
            'del': 46,
            '0': 48,
            '1': 49,
            '2': 50,
            '3': 51,
            '4': 52,
            '5': 53,
            '6': 54,
            '7': 55,
            '8': 56,
            '9': 57
			};
			for(var index in keys) {
				if (!keys.hasOwnProperty(index)) continue;
				if (event.charCode==keys[index]||event.keyCode==keys[index]) {
					return; //default event
				}
			}   
			event.preventDefault();
		};

		
		

		

});

//main controller method ends here --------------------------	



// page controllers ----------------------------------------------------	
	
	

	pwbp.controller('projectsetupController', function($scope) {
		$scope.message = 'project setup';
	
	});
	
	pwbp.controller('pwteamsetupcontroller', function($scope) {
		$scope.message = 'Perkins & Will Team Setup';
	});
	
	pwbp.controller('custeamsetupcontroller', function($scope) {
		$scope.message = 'Customer Team Setup';
	});
	
	pwbp.controller('eprojectlistController', function($scope) {
		$scope.message = 'Project List';
	});
	
	pwbp.controller('ecustomerlistController', function($scope) {
		$scope.message = 'Customer List';
	});
	
	pwbp.controller('InsideCtrl', function ($scope, ngDialog) {
        $scope.dialogModel = {
                message : 'message from passed scope'}
    });
	pwbp.controller('InsideCtrl1', function ($scope, ngDialog) {
        $scope.dialogModel = {
                message : 'message from passed scope'}
    });