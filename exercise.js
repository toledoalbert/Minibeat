//Minibeat app for Gizmodo
//Developed by Albert Toledo
//for internship application for Chartbeat.

//Declare the app object.
var app = { 

	//Data variable to hold the information about the pages.
	data : [],

	//init funciton to call the read json method.
	init : function(){

		this.readJSON();

	},

	//Definition of the function to read json from remote url and call the populate top pages function.
	readJSON : function () {

		//create variable to hold the api url for gizmodo.com.
		var url = "http://api.chartbeat.com/live/toppages/v3/?apikey=317a25eccba186e0f6b558f45214c0e7&host=gizmodo.com";

		//create the httprequest object.
		request = new XMLHttpRequest();

			//set the function defined below to statechange attribute of the request object.
			request.onreadystatechange = ensureReadiness;

	        //Define the ensureReadiness method.
	        function ensureReadiness() {

	        	//Check state and status and return nothing if not ready.
	        	if(request.readyState < 4) {
	        		return;
	        	}
	        	if(request.status !== 200) {
	        		return;
	        	}

	            //Check if ready.
	            if(request.readyState === 4) {

	            	//Store the info about the pages in data array of app object.
	            	app.data = JSON.parse(this.response).pages;

	                //Populate the top pages.
	                app.populateTopPages();
	            }
	        }

	        //Open the request with get and api url.
	        request.open('GET', url, true);

	        //Send the request.
	        request.send('');

	    },


	//Definition of the function that will populate the referrers list
	//everytime a page title is clicked.
	showReferrers : function (page){

		//Hold the data in a new variable.
		var data = app.data;

		//Add the list item to the list of the pages.
		var refList = document.getElementById("referrerList");

		//Remove all childrend from the list before adding new ones.
		while(refList.firstChild){

			refList.removeChild(refList.firstChild);

		}

		//Change the title of the side pane.
		document.getElementById("detailsTitle").innerHTML = data[page].title;

		//For loop to go through the 
		for(var i = 0; i < data[page].stats.toprefs.length; i++){

			//Create new list item.
			var li = document.createElement("li");

			//Set the class for the list item to hold referrer domain.
			li.setAttribute("class", "referrer");

			//Create span element to hold visitor number.
			var span = document.createElement("span");

			//Set the class for span element to hold visitor number.
			span.setAttribute("class", "visitorNum");

			//Set the visitor number as inner html for the span element.
			span.innerHTML = data[page].stats.toprefs[i].visitors;

	    	//Create new text node with page title and append to the list item.
	    	li.appendChild(document.createTextNode(data[page].stats.toprefs[i].domain));

	    	//Add the span to the list item.
	    	li.appendChild(span);

	    	//Add the list item to the list element.
	    	refList.appendChild(li);

	    }

	},

	//Function to populate the top pages list.
	populateTopPages : function (){

		//Hold the data in a new variable.
		var data = app.data;

		//Add the list item to the list of the pages.
		var topPages = document.getElementById("pagesList");

		//Remove all childrend from the list before adding new ones.
		while(topPages.firstChild){

			topPages.removeChild(topPages.firstChild);

		}

		//Go through all 10 pages.
		for(var i = 0; i < app.data.length; i++){

			//Create new list item.
			var li = document.createElement("li");

			//Set the index as data attribute for the list item.
			li.setAttribute("data-index", i);

			//Create span element for number of people.
			var span = document.createElement("span");

			//Set class attribute for the span element.
			span.setAttribute("class", "stat");

			//Set the number of people as inner html to the span.
			span.innerHTML = data[i].stats.people;

			//Append the span element to list item.
			li.appendChild(span);

			//Append the title of the page to the list item.
			li.appendChild(document.createTextNode(data[i].title));

			//Add event listener to the list item that would
			//display the referrers when title is clicked.
			li.addEventListener('click', function() {

					//Get the index from the data attribute.
					var index = this.getAttribute('data-index');

	                //Cal the showReferrers using the index from data attribute.
	                app.showReferrers(index);
	            });

			//Add the list item to the list of the pages.
			document.getElementById("pagesList").appendChild(li);

		}
	}

}

//Call the init function for the app every second.
setInterval(function mytimer(){app.init()},1000);
