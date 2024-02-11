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
        username: 'tren_brah',
        comment: 'Injecting steroids is like putting rocket fuel in your muscles. Just remember, even astronauts have to come back down to Earth eventually! 🚀😅💪'
    },
    {
        id: uuid(),
        username: 'sarms_goblin69',
        comment: 'Bro, FUCK BEING NATTY'
    }

]

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/comments', (req, res) => {
    res.render('comments', { comments })
})

app.listen(3000, () => {
    console.log("Server running on port 3000...")
})