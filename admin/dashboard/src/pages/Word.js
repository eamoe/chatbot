import AppLayout from "../components/AppLayout";
import FormInput from "../components/FormInput";
import FormTextarea from "../components/FormTextarea";
import {useState, useEffect} from "react";
import {useParams, useNavigate} from "react-router-dom";

const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;
const Word = () => {

    let {id} = useParams()
    const navigate = useNavigate()

    const [word, setWord] = useState(null)
    const [definition, setDefinition] = useState(null)
    const [wordName, setWordName] = useState(null)
    const [partOfSpeech, setPartOfSpeech] = useState(null)
    const [error, setError] = useState([])

    const onChangeWordName = (event) => {
        setWordName(event.target.value);
    };

    const onChangePartOfSpeech = (event) => {
        setPartOfSpeech(event.target.value);
    };

    const onChangeDefinition = (event) => {
        setDefinition(event.target.value);
    };

    const getWord =  async() => {
        const res = await fetch(`${REACT_APP_BASE_URL}${id}`)
        if (!res.ok){
            setError("Error fetching word")
        } else {
            const data = await res.json()
            setWord(data)
            setWordName(data.wordName)
            setPartOfSpeech(data.partOfSpeech)
            setDefinition(data.definition)
        }
    }

    const handleDelete = async () => {
        const response = await fetch(`${REACT_APP_BASE_URL}${id}`,{
            method:"DELETE",
            headers:{
                'Content-Type':'application/json'
            }
        })

        if(!response.ok) {
            const data  = await response.json()
            let errArray = data.detail.map(el=>{
                    return `${el.loc[1]} -${el.msg}`
                })
            setError(errArray)
        } else {
            setError([])
            navigate("/words")
        }
    }

    const updateWord = async () => {
        const response = await fetch(`${REACT_APP_BASE_URL}${id}`,{
            method:"PATCH",
            headers:{
                'Content-Type':'application/json'
                },
            body: JSON.stringify({wordName, partOfSpeech, definition})})

        const data = await response.json()
        if(!response.ok) {
            let errArray = data.detail.map(el=>{
                return `${el.loc[1]} -${el.msg}`
            })
            setError(errArray)
        } else {
            setError([])
            getWord()
        }


    }

    useEffect(()=>{getWord(id)},[id])

  return (
      <AppLayout>
          {
              error &&
              <ul className="mx-auto text-center">
                  { error && error.map(
                      (el, index)=>(
                          <li key={index} className="my-3 p-1 border-1 border-danger mx-auto">{el}</li>
                      )
                  )}
              </ul>
          }

          {
              word &&
              <div className="row">
                  <div className="col-6">Placeholder for image</div>
                  <div className="col-6">
                      <div className="card">
                          <div className="card-body">
                              <h5 className="card-title text-center">{word.wordName}
                                  <span className="text-muted"> ({word.partOfSpeech})</span>
                              </h5>
                              <form className="my-5">
                                  <label htmlFor="wordName" className="form-label d-none">Word</label>
                                  <FormInput
                                      cssStyle="form-control d-none"
                                      id="wordName"
                                      type="text"
                                      placeholder="word..."
                                      value={wordName}
                                      onChange={() => {}}
                                      disabled={true}
                                      required
                                  />
                                  <label htmlFor="partOfSpeech" className="form-label d-none">Part of speech</label>
                                  <FormInput
                                      cssStyle="form-control d-none"
                                      id="partOfSpeech"
                                      type="text"
                                      placeholder="part of speech..."
                                      value={partOfSpeech}
                                      onChange={() => {}}
                                      disabled={true}
                                      required
                                  />
                                  <label htmlFor="definition" className="form-label">Definition</label>
                                  <FormTextarea
                                      cssStyle="form-control"
                                      id="definition"
                                      type="text"
                                      placeholder="Add new value..."
                                      value={definition}
                                      disabled={false}
                                      onChange={onChangeDefinition}
                                      required
                                  />
                                  <a onClick={handleDelete} className="card-link">Delete Word</a>
                                  <a onClick={updateWord} className="card-link">Edit Word</a>
                                  <p className="pt-3 text-warning">deleting is permanent!</p>
                              </form>
                          </div>
                      </div>
                  </div>
              </div>
          }
      </AppLayout>
  )
}
export default Word
