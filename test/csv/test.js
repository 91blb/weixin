var csv=require("fast-csv");
var fs=require("fs");
var path=require("path");
var csvStream = csv.createWriteStream({headers: true}),
    writableStream = fs.createWriteStream(path.resolve(__dirname,"my.csv"));

writableStream.on("finish", function(){
  console.log("DONE!");
});

csvStream.pipe(writableStream);
csvStream.write({a: "a0", b: "b0"});
csvStream.write({a: "a1", b: "b1"});
csvStream.write({a: "a2", b: "b2"});
csvStream.write({a: "a3", b: "b4"});
csvStream.write({a: "a3", b: "b4"});
csvStream.end();
