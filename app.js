const express=require("express");
const bodyParser=require("body-parser");
const mongoose=require("mongoose");
const { get } = require("express/lib/response");
const app=express();
app.set("view engine","ejs");

mongoose.connect("mongodb+srv://FirstKenpachi:******@cluster0.ryesd.mongodb.net/?retryWrites=true&w=majority")
const ItemSchema=mongoose.Schema({
    name:String
})

const item=mongoose.model("Item",ItemSchema);
const item1=new item({
    name:"Type a new Item"
})
const item2=new item({
    name:"Hit the + to enter"
})
const item3=new item({
    name:"Hit the button to cancel"
})
let defaultItems=[item1,item2,item3];
const listSchema=mongoose.Schema({
    name:String,
    things:[ItemSchema]
})
const List=mongoose.model("List",listSchema);

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

var today=new Date();
    var currentday=today.getDay();
    var options={
        weekday:"long",
        day:"numeric",
        month:"long"
    }
var day=today.toLocaleDateString("en-US",options);
var title1="Today";


app.get('/',(req,res)=>{
    

    item.find((err,ite)=>{
        if(err){
            console.log(err)
        }else{
                if(ite.length===0){
                    item.insertMany([item1,item2,item3],(err)=>{
                         if(err){
                              console.log(err)
                         }else{
                              console.log("Successfully saved the items")
                         }

                    })

                }else{
                     //items.push(element.name);
                     res.render("list",{Listtitle:title1,newItem:ite,day:title1});

                }   
        }
    })
})
app.post('/',(req,res)=>{
    var query=req.body.newact;
    var listName=req.body.list;
    const temp_item=new item({
        name:query
     })
    if (listName===title1){
        
        temp_item.save();
        res.redirect('/');

    }else{
        List.findOne({name:listName},(err,foundList)=>{
            if(!foundList){
                 const list=new List({
                     name:listName,
                     things:defaultItems
                 })
                 list.save();

            }else{
                foundList.things.push(temp_item);
                foundList.save();
                res.redirect("/"+listName)

            }
            
                

            
        })

    }
    

    
    
})
app.post("/delete",(req,res)=>{
    const check_delete=req.body.checkbox;
    const titlelist=req.body.hidden;
    if(titlelist==="Today" || titlelist==="favicon.ico"){
        item.findByIdAndRemove(check_delete,(err)=>{
           if(!err){
            console.log("Successfully deleted")
            res.redirect("/");
           }
        })

    }else{
        List.findOneAndUpdate({name:titlelist},{$pull:{things:{_id: check_delete}}},(err,foundlist)=>{
            if(!err){
                console.log(titlelist);
                res.redirect("/"+titlelist);
            }
        })

    }
    

})
// app.get("/work",(req,res)=>{
    
//     if (title.length>1){
//         let temp="";
//         temp=title[0];
//         title[0]=title[1];
//         title[1]=temp;
//         title.pop();
//         while(workitems.length){
//             workitems.pop();
//         }
//          while(items.length){
//            items.pop();
//         }
//     }
//     var today=new Date();
//     var currentday=today.getDay();
//      var options={
//         weekday:"long",
//         day:"numeric",
//         month:"long"
//     }
//     var day=today.toLocaleDateString("en-US",options);
//     var title1="Today is"+" " +day;
    
//     res.render("list",{Listtitle:title,newItem:workitems,day:title1})

// })
app.get("/:customListName",(req,res)=>{
    let customListName=req.params.customListName;
    console.log(customListName);
    List.findOne({name:customListName},(err,foundList)=>{
        if(!foundList){
             const list=new List({
             name:customListName,
             things:defaultItems
            })
            list.save();
            res.redirect("/"+customListName);
        }else{
            res.render("list",{Listtitle:foundList.name,newItem:foundList.things,day:title1});
        }
    })
   

})

// app.post("/work",(req,res)=>{
//     let titles=req.body.newtitle;
//     if (titles===undefined){
//         console.log("dont push");

        
//     }else{
//         title.push(titles);
//     }
//     let query2=req.body.newact2;
//     workitems.push(query2);
//     res.redirect('/work');

// })
app.post("/wo",(req,res)=>{
    const new_title=req.body.newtitle;
    
})
app.listen(process.env.PORT||3000,()=>{
    console.log("The Server is up and running");
});

