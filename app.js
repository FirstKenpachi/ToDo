const express=require("express");
const bodyParser=require("body-parser");

const app=express();
app.set("view engine","ejs");


var items=[];
var workitems=[];
let title=[];


app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));


app.get('/',(req,res)=>{
    var today=new Date();
    var currentday=today.getDay();
    
    
    
    var options={
        weekday:"long",
        day:"numeric",
        month:"long"
    }
    var day=today.toLocaleDateString("en-US",options);
    let title1="Today is"+" " +day;
    res.render("list",{Listtitle:title1,newItem:items});
    

})
app.post('/',(req,res)=>{
    var query=req.body.newact;
    

    
    items.push(query);
    res.redirect('/');
    
})
app.get("/work",(req,res)=>{
    
    

    res.render("list",{Listtitle:title,newItem:workitems})

})
app.post("/work",(req,res)=>{
    let titles=req.body.newtitle;
    title.push(titles);
    console.log(title)

    res.redirect('/work');

})
app.listen(process.env.PORT||3000,()=>{
    console.log("The Server is up and running");
})