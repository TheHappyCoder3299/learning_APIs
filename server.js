const fs=require(`fs`);

//It can also be done like this, but this reads the file like a text
//document. It does not realize that it is a JSON
// let words=fs.readFileSync('words.json','utf8');


//This recognizes that it is a JSON
let data = fs.readFileSync('words.json');
let words=JSON.parse(data);



console.log(words);



const express=require(`express`)
const app=express()
const server=app.listen(3000)


app.use(express.static(`public`))


app.get('/',(req,res)=>{
    res.send(`Welcome to learning APIs`)
})

app.get('/data',(req,res)=>{
    res.send(words);
})


//The question mark makes the score optional
app.get('/add/:word/:score?',(req,res)=>{
    let word=req.params.word;
    let score=req.params.score;


    if(!score){
        res.send(`Score is required`);
    }

    words[word]=Number(score);  
    //JSON.stringify changes the JSON to a string 
    //null and 2 is for indentation because stringify converts to a text with as little 
    //characters or whitespaces as possible
    let data=JSON.stringify(words,null,2);
    fs.writeFile('words.json',data,(err)=>{
        if(err) console.log(err);
        console.log(`Successfully added new data`);
    });

    res.send(words);
})



app.get('/search/:word',(req,res)=>{
    let word=req.params.word;
    let reply;
    if(words[word]){
        reply={
            "msg" : "Found this word",
            "word" : word,
            "score" :words[word]
        }
    }
    else{
        reply={
            "msg" :"Did not find this word",
            "word" :word
        }
    }
    
    
    res.send(reply);
})