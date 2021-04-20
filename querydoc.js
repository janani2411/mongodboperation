const MongoClient = require("mongodb").MongoClient;

const url = "mongodb://localhost:27017/onlinecourse";

//mongodb connection and database creation
MongoClient.connect(url,{useUnifiedTopology: true},function(err,db){
    if(err)
        throw err;
    // console.log("Database connected uccessfully");
    
    //use database
    let dbName = db.db("onlinecourse");
    
    //QUERY AN ARRAY

    let multiDataInsert = [
        { name : "Ben" , age : 18 , course : [ "Node.js" , "MongoDB" ] } ,
        { name : "Tom" , age : 21 , course : [ "HTML" , "CSS" , "Node.js"] } ,
        { name : "Jerry" , age : 19 , course : [ "HTML" , "CSS" , "MongoDB"]  } ,
        { name : "Jamy" , age : 23 , course : [ "HTML" , "CSS" ]  }
    ];

    dbName.collection("students").insertMany(multiDataInsert,function(err , result){
        if( err ) 
            throw err;
        console.log(result);
        db.close();
    });

    //Match An Array

    //It finds an array that contains both elements with or without in order
    dbName.collection("students").find({course :{$all : ["HTML","CSS"]}}).toArray(function(err,result){
        if(err)
            throw err;
        console.log(result);

    db.close();
    });

    //It finds an array that contains extactly the two elements in the field.
    dbName.collection("students").find({course :["HTML","CSS"]}).toArray(function(err,result){
        if(err)
            throw err;
        console.log(result);

    db.close();
    });

    // Query an Array for an Element

    // $gt = greter than 
    // below code displays the age greater than 20 documents 
    dbName.collection("students").find({age : { $gt : 20 }}).toArray(function(err,result){
        if(err)
            throw err;
        console.log(result);

    db.close();
    });

    //Query for an Array Element that Meets Multiple Criteria
    //$elemMatch operator matches more than one component within an array element
    dbName.collection("students").find({ course_price : { $elemMatch  : { $gt : 3700 , $lt : 5000 }}}).toArray(function(err,result){
        if(err)
            throw err;
        console.log(result);

    db.close();
    });

    //Query for an Element by the Array Index Position
    // It checks all the documnets course_price at index 1 (position 2)
    dbName.collection("students").find({ "course_price.1" : { $lt : 4000 }}).toArray(function(err,result){
        if(err)
            throw err;
        console.log(result);

    db.close();
    });

    // Query an Array by Array Length
    // It selects document where course_price  array size is equal to 2 
    dbName.collection("students").find({ course_price : { $size : 2 }}).toArray(function(err,result){
        if(err)
            throw err;
        console.log(result);

    db.close();
    });

    dbName.collection("students").find({ "course_price.1" : { $lt : 4000 }}).toArray(function(err,result){
        if(err)
            throw err;
        console.log(result);

    db.close();
    });

    //PROJECTION 

    dbName.collection("students").find({ age : { $gt : 21 },"course.1" : "CSS" } ,{ projection : { _id : 0 }}).toArray(function(err,result){
        if(err)
            throw err;
        console.log(result);

    db.close();
    });

    //Project Specific Array Elements in the Returned Array
    // $slice operator is used to return number of array elements 
    // -1 returns last element
    
    dbName.collection("students").find({ age : { $gt : 21 }} ,{ projection : { _id : 0,course : { $slice : -1 } }}).toArray(function(err,result){
        if(err)
            throw err;
        console.log(result);

    db.close();
    });
    
});
