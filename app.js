const express = require('express')
const app = express()
const path = require('path')
const { v4: uuid } = require('uuid');
const methodOverride = require('method-override');

app.use(express.urlencoded( {extended: true}))
app.use(express.json())
app.use(methodOverride('_method'))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

let comments = [
    {
        id: uuid(),
        username: 'honduranhunk',
        comment: 'Do you even lift brah??'
    },
    {
        id: uuid(),
        username: 'gym_gladiator',
        comment: 'Real gains come from SARMS and TREN!'
    },
    {
        id: uuid(),
        username: 'sarmsgod69',
        comment: 'Injecting steroids is like putting rocket fuel in your muscles. You feel like a goddamn astronaut baby! 🚀💪'
    },
    {
        id: uuid(),
        username: 'tren_twins',
        comment: 'Bro, STOP BEING NATTY'
    }

]

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/comments', (req, res) => {
    res.render('comments', { comments })
})

app.get('/comments/new', (req, res) => {
    res.render('comments/new')
})

app.post('/comments', (req, res) => {
    const { username, comment } = req.body
    comments.push({ id: uuid(), username, comment })
    res.redirect('/comments')
})

app.get('/comments/:id', (req, res) => {
    const { id } = req.params
    const comment = comments.find(c => c.id === id)
    res.render('comments/show', { comment })
})

app.get('/comments/:id/edit', (req, res) => {
    const { id } =  req.params
    const comment = comments.find(c => c.id === id)
    res.render('comments/edit', { comment })
})

app.patch('/comments/:id', (req, res) => {
    const { id } = req.params
    const comment = comments.find(c => c.id === id)
    comment.comment = req.body.comment
    res.redirect('/comments')
})

app.delete('/comments/:id', (req, res) => {
    const { id } = req.params
    comments = comments.filter(c => c.id !== id) 
    res.redirect('/comments')
})


app.listen(3000, () => {
    console.log("Server running on port 3000...")
})