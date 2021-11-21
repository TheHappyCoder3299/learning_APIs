let words={
    "rainbow":10,
    "flowers":15,
    "doom":-5
}

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