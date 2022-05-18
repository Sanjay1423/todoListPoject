const express = require('express')
const PORT = process.env.PORT || 3000
const app = express()

let homeItems = []
let workItems = []
let businessItems = []


app.set('view engine','ejs')
app.use(express.urlencoded({'extended':true}))
app.use(express.static('public'))

app.get('/',(req,res)=>{
    const dayReq ={weekday:'long',month:'long',day:'numeric'}
    const date = new Date()
    const dayInfo = date.toLocaleDateString('en-us',dayReq)
    res.render('list',{listTitle:dayInfo,newListItem:homeItems})
    
})

app.post('/',(req,res) =>{
    let item = req.body.newItem
   
    if (req.body.button == 'work'){
        workItems.push(item)
        res.redirect('/work')
        
    }else if (req.body.button = "Business"){
        businessItems.push(item)
        res.redirect('/business')
    }else{
        homeItems.push(item)
        res.redirect('/')
    }
  
})

app.get('/work',(req,res) =>{
    res.render('list',{listTitle:'work',newListItem:workItems})
})

app.get('/business',(req,res)=>{
    res.render('list',{listTitle:'Business',newListItem:businessItems})
})



app.listen(PORT,() => console.log(`Server started in Port ${PORT}`))



