var selectedBranch = null;
var selectedBuilding = null;
var selectedFloor = null;
var selectedRoom = null;
var storedInfo = [];


function start() {
	resetDropdowns(0);
	loadBranches();
}

function loadBranches() {
	var updateBranch = document.getElementById("branch");
	
	var option = document.createElement("option");
	option.value = "";
	option.text = "Select a Branch";
	option.selected = true;
	option.hidden = true;
	updateBranch.add(option);
	
	for (var i = 0; i < data.branch.list.length; i++)
	{
		var option = document.createElement("option");
		option.value = i;
		option.text = data.branch[i].name;
		updateBranch.add(option);
	}
	updateBranch.selectedIndex = 0;
	//setting visibility of all page elements;
}


function loadBuildings(branch)
{
	selectedBranch = branch;
	var updateBuilding = document.getElementById("buildings");
	
	var option = document.createElement("option");
	option.value = "";
	option.text = "Select a Building";
	option.disabled = true;
	option.selected = true;
	option.hidden = true;
	updateBuilding.add(option);
	for (var i = 0; i < data.branch[selectedBranch].list.length; i++)
	{
		var option = document.createElement("option");
		option.value = i;
		option.text = data.branch[selectedBranch][i].name;
		updateBuilding.add(option);
	}
	
	document.getElementById("buildingSection").style.display = "block";
}

function loadFloors(building)
{
	selectedBuilding = building;
	var updateFloors = document.getElementById("floors");
	
	var option = document.createElement("option");
	option.value = "";
	option.text = "Select a Floor";
	option.disabled = true;
	option.selected = true;
	option.hidden = true;
	updateFloors.add(option);
	for (var i = 0; i < data.branch[selectedBranch][selectedBuilding].floors.length; i++)
	{
		var option = document.createElement("option");
		option.value = i;
		option.text = data.branch[selectedBranch][selectedBuilding].floors[i];
		updateFloors.add(option);
	}
	
	document.getElementById("floorSection").style.display = "block";
}

function loadRooms(floor)
{
	selectedFloor = floor;
	var updateRooms = document.getElementById("rooms");
	
	var option = document.createElement("option");
	option.value = "";
	option.text = "Select a Room";
	option.disabled = true;
	option.selected = true;
	option.hidden = true;
	updateRooms.add(option);
	for (var i = 0; i < data.branch[selectedBranch][selectedBuilding][selectedFloor].rooms.length; i++)
	{
		var option = document.createElement("option");
		option.value = i;
		option.text = data.branch[selectedBranch][selectedBuilding][selectedFloor].rooms[i];
		updateRooms.add(option);
	}
	
	document.getElementById("roomSection").style.display = "block";
}

function loadData(room)
{
	selectedRoom = room;
	var updateNotes = document.getElementById("notes");
	var updateInitials = document.getElementById("initials");
	
	if (storedInfo[[selectedBranch]+","+[selectedBuilding]+","+[selectedFloor]+","+[selectedRoom]+",notes"] == null)
	{
		storedInfo[[selectedBranch]+","+[selectedBuilding]+","+[selectedFloor]+","+[selectedRoom]+",notes"] = "";
	}
	else
	{
		updateNotes.value = storedInfo[[selectedBranch]+","+[selectedBuilding]+","+[selectedFloor]+","+[selectedRoom]+",notes"];
	}
	
	if (storedInfo[[selectedBranch]+","+[selectedBuilding]+","+[selectedFloor]+","+[selectedRoom]+",initials"] == null)
	{
		storedInfo[[selectedBranch]+","+[selectedBuilding]+","+[selectedFloor]+","+[selectedRoom]+",initials"] = "";
	}
	else
	{
		updateInitials.value = storedInfo[[selectedBranch]+","+[selectedBuilding]+","+[selectedFloor]+","+[selectedRoom]+",initials"];
	}
	document.getElementById("data").style.display = "block";
	document.getElementById("notesSection").style.display = "block";
	document.getElementById("initialsSection").style.display = "block";
	document.getElementById("buttonsSection").style.display = "block";
}


function resetDropdowns(step)
{
	if (step < 1)
	{
		removeDropdownElements(document.getElementById("branch"));
		selectedBranch = null;
	}
	if (step < 2)
	{
		document.getElementById("buildingSection").style.display = "none";
		removeDropdownElements(document.getElementById("buildings"));
		selectedBuilding = null;
	}
	
	if (step < 3)
	{
		document.getElementById("floorSection").style.display = "none";
		removeDropdownElements(document.getElementById("floors"));
		selectedFloor = null;
	}
	
	if (step < 4)
	{
		document.getElementById("roomSection").style.display = "none";
		removeDropdownElements(document.getElementById("rooms"));	
		selectedRoom = null;
	}
	
	if (step < 5)
	{
		document.getElementById("data").style.display = "none";
	
		document.getElementById("notesSection").style.display = "none";
		document.getElementById("notes").value = "";

		document.getElementById("initialsSection").style.display = "none";
		document.getElementById("initials").value = "";
		
		document.getElementById("buttonsSection").style.display = "none";
	}
	
	if (step < 6)
	{
		document.getElementById("submit").backgroundcolor = "#dcdcdc";
		document.getElementById("submit").bordercolor = "#dcdcdc";
	}
}

function removeDropdownElements(selectbox)
{    
	var i;
    for(i = selectbox.options.length - 1 ; i >= 0 ; i--)
    {
        selectbox.remove(i);
    }
	
}

function changeBranch(selectObj)
{	
	if  (isNaN(selectObj.value)==false)
	{
		resetDropdowns(1);
		loadBuildings(selectObj.value);
	}
	else
	{
		
		resetDropdowns(0);
		loadBranches();
	}
}

function changeBuilding(selectObj)
{	
	if  (isNaN(selectObj.value)==false)
	{
		resetDropdowns(2);
		loadFloors(selectObj.value);
	}
	else
	{
		resetDropdowns(0);
		loadBranches();
	}
}

function changeFloor(selectObj)
{	
	if  (isNaN(selectObj.value)==false)
	{
		resetDropdowns(3);
		loadRooms(selectObj.value);
	}
	else
	{
		resetDropdowns(0);
		loadBranches();
	}
}

function changeRoom(selectObj)
{	
	if  (isNaN(selectObj.value)==false)
	{
		resetDropdowns(4);
		loadData(selectObj.value);
	}
	else
	{
		resetDropdowns(0);
		loadBranches();
	}
}


function submitNotes()
{
		var updateNotes = document.getElementById("notes");
		var updateInitials = document.getElementById("initials");
	if (updateNotes.value == "" || updateInitials.value == "")
	{
		alert("please enter in the required data.")
	}
	else
	{
			
		storedInfo[[selectedBranch]+","+[selectedBuilding]+","+[selectedFloor]+","+[selectedRoom]+",notes"] = updateNotes.value;

		storedInfo[[selectedBranch]+","+[selectedBuilding]+","+[selectedFloor]+","+[selectedRoom]+",initials"] = updateInitials.value;
		
		alert("data stored in storedInfo array. see console");
		console.log(storedInfo);
		
	}
}