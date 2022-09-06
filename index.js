const express = require('express')

const app = express()
const port = 3000

//parse the json using express
app.use(express.json())
app.use(express.urlencoded({extended: false  }))


let movies = [{
    id: '1',
    title: 'Inception',
    director: 'Christopher Nolan',
    release_date: '2010-07-16'
},
{
    id: '2',
    title: 'The Irishman',
    director: 'Martin Scorsese',
    release_date: '2019-09-27'
}
]

//get the movie list in the form of json

app.get('/movie', (req, res) => {
    res.json(movies)
})


//add a movie to our array
app.post('/movie', (req, res) => {
    const movie = req.body

    console.log(movie)
    movies.push(movie)
    res.send("Movie is added to the list!")
})

//searchfor a movie in a list
app.get('/movie/:id', (req, res) => {

    const id = req.params.id

    for(let movie of movies){
        if(movie.id === id){
            res.json(movie)
            return 
        }
    }

    res.status(port, () => console.log(`Movie not found`))
})



//delete movies from the array
app.delete('/movie/:id', (req, res) => {
    const id = req.params.id
        
        movies = movies.filter(movie => {
            if(movie.id !== id){
                return true
            }
            return false
        })
    res.send('Movie has been deleted')
})


//set the server to listen at port
app.listen(port, () => console.log(`Server listining at port ${port}`))