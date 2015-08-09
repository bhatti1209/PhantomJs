var globals = require('./globals');
var page = require('webpage').create();

page.open(globals.mainPage, function(){
});

page.onLoadFinished = function(){
    var currentUrl = page.url;
    console.log('[OnPageLoad] Current url: ' + currentUrl);
    if(currentUrl == globals.mainPage){
	onFirstPageLoad();
    }
    if(currentUrl == globals.homePage){
	onHomePageLoad();
    }
    if(currentUrl === globals.attendancePage){
	onAttendancePageLoad();
	phantom.exit();	
    }
};

var onFirstPageLoad = function (){
    page.render('./Output/0.OpenMainSite.png');
    
    page.includeJs(globals.onlineJquery, function(){
	page.evaluate(function(){
	    document.getElementById("txtLoginName").value ="bharats";
	    document.getElementById("txtPassword").value ="Bh@r@t123!@#";
	});
	console.log("Login Details Filled.");
	page.render('./Output/1.LoginDetailsFilled.png');
	console.log('Firing Submit Button.');
	page.evaluate(function (){
	    document.getElementById("cmdSubmit").click();
	});
    });  
};

var onHomePageLoad = function(){
    console.log("Landed on the home page.");
    page.render('./Output/2.HomePageAfterLogin.png');
    //page.includeJs(globals.onlineJquery, function(){
    page.evaluate(function() {
	document.getElementById("ctl00_mnuList_rmMenu_m1").click();
	document.getElementById("ctl00_mnuList_rmMenu_m1_m1").click();
    });
    //});
};

var onAttendancePageLoad = function (){
    page.render('./Output/4.AttendancePage.png');
};
