/**
 * Created by ruotianwang on 12/2/16.
 */


/*------Indicator initialization--------*/
//used for the key of every record
var recordId = 0;
//store the whole key
var recordIdList = [];
//store the list of 'record' object
var recordObjectList = [];

//get the current id from local storage
if(!localStorage.getItem("page_sport_id"))
    localStorage.setItem("page_sport_id", recordId);
else
    recordId = localStorage.getItem("page_sport_id");

//get the idList from local storage
if(!localStorage.getItem("page_sport_idList"))
    localStorage.setItem("page_sport_idList", recordIdList);
else
    recordIdList = localStorage.getItem("page_sport");

//get the objectList from local storage
if(!localStorage.getItem("page_sport_object"))
    localStorage.setItem("page_sport_object", recordObjectList);
else
    recordObjectList = localStorage.getItem("page_sport_object");


/*--------AnjularJS Module Part---------*/
var app = angular.module("Test", []);
app.controller("myCtrl", function($scope){
    //initData is for final display purpose
    $scope.initData = formInitData();

    //get the input and write into local storage
    $scope.addItem = function() {
        $scope.errortext = "";
        //create JSON constructor to save each newRecord
        var newRecord = {};
        newRecord.id = recordId;
        newRecord.name = $scope.record_name;
        newRecord.time = $scope.record_time;
        newRecord.location = $scope.record_location;
        newRecord.desc = $scope.record_description;
        newRecord.imgPath = "";
        newRecord.fav = 0;

        console.log("newRecord Object: " + newRecord);//work!!!!!

        //if(!$scope.Name || !$scope.Time || !$scope.Location || !$scope.Description) {return;}

        if(recordObjectList.indexOf(newRecord) == -1 && newRecord != null) {

            //update the content in the screen
            $scope.initData.concat(styleRecord(newRecord));

            //if the storage capacity exceed here, clear the local storage
            var idString = recordId + "";
            console.log("idString: " + idString);
            try{
                localStorage.setItem("idString", JSON.stringify(newRecord));
                console.log("Stringify: " + JSON.stringify(newRecord));
            }catch(oException){
                if(oException.name == 'QuotaExceededError'){
                    console.log('Storage capacity exceed!');
                    localStorage.clear();
                    localStorage.setItem("idString", JSON.stringify(newRecord));
                }
            }
            //add current object into recordObjectList
            recordObjectList.push(JSON.stringify(newRecord));
            localStorage.setItem("page_sport_object", recordObjectList);
            //add current id into recordIdList
            recordIdList.push(recordId);
            localStorage.setItem("page_sport_idList", recordIdList);
            //recordId self-increment to make sure unique
            recordId++;
            localStorage.setItem("page_sport_id", recordId);
        }else{
            $scope.errortext = "This newRecord is already existed.";
        }
    }
    //click the "x" to remove the element
    $scope.removeItem = function(x) {
        $scope.errortext = "";
        //splice(index, number of the element)
        $scope.initData.splice(x, 6);
        //remove index from indexList

    };
});

//read from localStorage and return a list of string represent the style
function formInitData() {
    var res = [];
    var list = localStorage.getItem("page_sport_idList");
    console.log("Initial list: " + list);
    for(var i = 0; i < list.length; i+=2) {
        var key = list[i];
        console.log("key value: " + key);
        var value = JSON.parse(localStorage.getItem(key + ""));
        console.log("Initial value: " + value);
        res.push(styleRecord(value));
    }
    return res;
}

//style the object
function styleRecord(record) {
    console.log("styleRecord: " + record);
    var res = [
        "<div id='record.id' class='col-sm-3'>" + "<h4>record.name</h4><br>" +
            "<hr>" + "<h5>record.time</h5><br>" +
            "<p>record.desc</p>" + "</div>"
            ];
    return res;
}

