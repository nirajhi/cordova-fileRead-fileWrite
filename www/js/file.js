var fileHandling = {
    textButton : "0",
    //textButton= 1 for  write file
    //            2 for read file
    
    initialize : function(){
       fileHandling.textButton = "0";
       document.addEventListener("deviceready", fileHandling.createFile, false);
    },
    
    submitButtonClicked : function(){
        fileHandling.textButton = "1";
        //alert(fileHandling.textSummitbutton);
        var data= document.getElementById("textInputField").value;
        document.addEventListener("deviceready", fileHandling.createFile, false);
        
    },
    
    showTextFileClicked : function(){
        fileHandling.textButton = "2";
        document.addEventListener("deviceready", fileHandling.createFile, false);
    },
    
    
    
    createFile : function(){
        //alert(dataLocsation);
        if(fileHandling.textButton == "0"){
            var dataLocation = cordova.file.documentsDirectory
        }else{
            var dataLocation = cordova.file.documentsDirectory + "/file.txt";;
        }
        
        window.resolveLocalFileSystemURL(dataLocation, fileHandling.fileCreationSuccess, fileHandling.fileCreationFailed); //retrieve DirectoryEntry or FileEntry using local URL
    },
    
    fileCreationSuccess : function(fileEntry){  //fileEntry = our file object
        
        //alert(fileEntry.name); // file.txt
        if(fileHandling.textButton == "1"){
            //getFile(,,onSuccess,) onSuccess is passed fileEntry object.
            //fileEntry.getFile("file.txt", {create:true,exclusive:false}, fileHandling.writeOnFile, fileHandling.fail);
            fileEntry.createWriter(function(writer){
                                   writer.write(document.getElementById("textInputField").value);
                                   alert("File has been written");
                                   },fileHandling.fail);
            
            
        }else if(fileHandling.textButton == "2"){
            fileEntry.file(function(filee) {
                           var reader = new FileReader();
                           reader.onloadend = function(e) { //asynchronous method so, when whole file has been read the statement inside it can be executed
                           //console.log("Text is: "+this.result);
                           document.getElementById("textFromLocalFile").innerHTML = reader.result;
                           }
                           
                           reader.readAsText(filee); //used to read text file.
                     
                     // alert(filee.name);
                           },fileHandling.fail);

            
        }else{
            fileEntry.getFile("file.txt",{create:true, exclusive:true},
                                function(){alert("file Created");},
                                function(){alert("file already present");}
                            );
            }
    },
    
  
    
//    writeOnFile : function(fileEntry){
//        fileEntry.createWriter(function(writer){
//                               writer.write(document.getElementById("textInputField").value);
//                               alert("File has been written");
//                               },fileHandling.fail);
//    },
    
    fail : function(evt){
        alert(evt.target.error.code);
    }
    
};

fileHandling.initialize();

