import React, {useState, useEffect} from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios'

const EditMovie = props => {

    const history = useHistory();

    const { id } = useParams();
    const [input, setInput ] = useState({
        title: '',
        director:'',
        metascore:''
    })

    useEffect(()=> {
        const updateThisMovie = props.movie.find( movie => `${movie.id}` === id ) 
        if(updateThisMovie){
            setInput(updateThisMovie)
        }
    },[id])

    const handlePostRequest = e => {
        e.preventDefault();
        axios.put(`http://localhost:5000/api/movies/${id}`, input)
        .then(res => {
            console.log(res)
            const updatedMovie = res.data
            const newArray = props.movie.filter( movie => {
                if(movie.id !== res.data.id){
                    return movie
                }
            })
            props.setMovie([...newArray, updatedMovie])
            history.push(`/movies/${id}`)
        })
        .catch(err => console.log(err))
    }

    const handleChange = e => {
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
    }
    return(
        <div>
            <h2>Edit Movie</h2>
            <form onSubmit={handlePostRequest}> 
                <div>
                    <label htmlFor='title'></label>
                    <input name='title' id='title' value={input.title} onChange={handleChange}/>
                </div>
                <div>
                    <label htmlFor='director'></label>
                    <input name='director' id='director'value={input.director} onChange={handleChange}/>
                </div>
                <div>
                    <label htmlFor='metascore'></label>
                    <input name='metascore' id='metascore' value={input.metascore} onChange={handleChange}/>
                </div>
                <button>Update</button>
            </form>
        </div>
    )
}

export default EditMovie;
