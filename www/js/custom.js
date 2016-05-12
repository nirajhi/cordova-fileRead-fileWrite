document.addEventListener("deviceready",onDeviceReady,false);
function onDeviceReady() {
    createFile();
}



function buttonClicked(){
   var data= document.getElementById("textInputField").value;
    document.addEventListener("deviceready", writeOnFile, false);
    //writeOnFile(data);
   // alert(data);
}



/* Writing to the text file */
function writeOnFile(){
   window.resolveLocalFileSystemURL(cordova.file.documentsDirectory, fileSystemInitializingSuccessW, fileSystemInitializingFailedW);
   }

function fileSystemInitializingSuccessW(dir){
    dir.getFile("data.txt", {create:true,exclusive:false},SaveToLocalFile,fail);
}

function SaveToLocalFile(fileEntry){
    fileEntry.createWriter(function(writer){
                           writer.write(document.getElementById("textInputField").value);
                           alert("File has been written");
                           },fail);

}

function fileSystemInitializingFailedW(e){
    alert("fileSystemInitializingFailedW");
    
}

/* File creation for initial start */
var createFile=function(){
    var dataLocation = cordova.file.documentsDirectory;
    window.resolveLocalFileSystemURL(dataLocation, fileSystemInitializingSuccess, fileSystemInitializingFailed);
}


function fileSystemInitializingSuccess(dir){
    dir.getFile("data.txt", {create:true,exclusive:true},gotFileEntry,gotFileEntryfail);
   }

function gotFileEntry(){
    alert("file Created");
    document.getElementById("textFromLocalFile").style.display = 'none';
   }

function gotFileEntryfail(e){
    alert("File already present");
   }
function fileSystemInitializingFailed(e){
    alert("fileSystemInitializingFailed");

}

function fail(){
    alert("Failed occured");}



/* Reading from file */
function showTextFile(){
    window.resolveLocalFileSystemURL(cordova.file.documentsDirectory + "/data.txt", fileSystemInitializingSuccessR, fileSystemInitializingFailedR);
}


function fileSystemInitializingSuccessR(fileEntry){
    fileEntry.file(function(file) {
                   var reader = new FileReader();
                   
                   reader.onloadend = function(e) {
                   //console.log("Text is: "+this.result);
                   document.getElementById("textFromLocalFile").innerHTML = this.result;
                   }
                   
                   reader.readAsText(file);
                   });
    
}
function fileSystemInitializingFailedR(){
}
