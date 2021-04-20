const MongoClient = require("mongodb").MongoClient;

const url = "mongodb://localhost:27017/onlinecourse";

//mongodb connection and database creation
MongoClient.connect(url,{useUnifiedTopology: true},function(err,db){
    if(err)
        throw err;
    // console.log("Database connected uccessfully");
    
    //use database
    let dbName = db.db("onlinecourse");

    /*
    AGGREGARATION
        groups the data from multiple documents and operates in many ways on 
    those grouped data in order to return one combined result.
    */


    // countDocuments
    dbName.collection("students").countDocuments({ age : 21} , function(err,result){
        if(err)
            throw err;
        console.log(result);

    db.close();
    });

    dbName.collection("students").aggregate([
        { $match: { course : "MongoDB" } },
        { $group: { _id: "$course", mycount : { $sum : 1  }}}
     ]).toArray(function(err,result){
        if(err)
                throw err;
            console.log(result);
    
        db.close();
     });

    dbName.collection("students").aggregate([{ $sort : { age : -1 }} , { $match : { name : /^J/ , course :"MongoDB" }}]).toArray(function(err,result){
        if(err)
            throw err;
        console.log(result);

    db.close();
    });

    // distinct
    dbName.collection("students").distinct("course" , function(err,result){
        if(err)
            throw err;
        console.log(result);

    db.close();
    });

    //Skip() - skip the documents how many we don't want from start and return all other documents
    dbName.collection("students").find({}).skip(5).toArray(function(err,result){
        if(err)
            throw err;
        console.log(result);

    db.close();
    });

    // $skip - skip the specified number of values from start
    dbName.collection("students").aggregate([{ $sort : { name : 1 } } , { $project: { _id : 0 , age : 1, name: 1 } },
        { $skip: 3 }]).toArray(function(err,result){
        if(err)
            throw err;
        console.log(result);

    db.close();
    });
    
    // limit() - return how many documents we want from collection from start
    dbName.collection("students").find({}).limit(2).toArray(function(err,result){
        if(err)
            throw err;
        console.log(result);

    db.close();
    });

    // $limit - return the specified number of values from start
    dbName.collection("students").aggregate([{ $sort : { name : -1 } } , { $project: { _id : 0 , course : 1 , age : 1, name: 1 } },
        { $limit: 4 }]).toArray(function(err,result){
        if(err)
            throw err;
        console.log(result);

    db.close();
    });

    dbName.collection("students").aggregate( [
        { $group: { _id: "$name", totalPersonsage: { $sum: "$age" } } },
        { $match: { totalPersonsage: { $gte: 21 } } }
     ] ).toArray(function(err,result){
        if(err)
            throw err;
        console.log(result);

    db.close();
    });

    
    dbName.collection("students").aggregate( 
        [ { $group: { _id: "$name", age : { $sort :{ age : -1 }}},
         $group: { _id: null , eldest : { $last : "$age" } , yongest : { $first : "$age"}} } ] ).toArray(function(err,result){
        if(err)
            throw err;
        console.log(result);

    db.close();
    });

});