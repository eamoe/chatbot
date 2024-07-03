import AppLayout from "../components/AppLayout";
import FormInput from "../components/FormInput";
import FormTextarea from "../components/FormTextarea";
import {useState, useEffect} from "react";
import {useParams, useNavigate} from "react-router-dom";
import ShowAlert from "../components/ShowAlert";
import {adminConfig} from "../config";

const REACT_APP_BASE_URL = adminConfig.REACT_APP_BASE_URL;

const Word = () => {

    let {id} = useParams()
    const navigate = useNavigate()

    const [word, setWord] = useState(null)
    const [definition, setDefinition] = useState(null)
    const [wordName, setWordName] = useState(null)
    const [partOfSpeech, setPartOfSpeech] = useState(null)
    const [error, setError] = useState([])
    const [alert, setAlert] = useState({ show: false, message: "", variant: "" });

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
        const res = await fetch(`${REACT_APP_BASE_URL}/words/${id}`)
        if (!res.ok){
            const data  = await res.json()
            let errArray = data.detail.map((el) => {
                return `${el.loc[1]} -${el.msg}`;
            });
            setError(errArray);
            setAlert({ show: true, variant: "danger", message: errArray.join(", ") });
        } else {
            const data = await res.json()
            setWord(data)
            setWordName(data.wordName)
            setPartOfSpeech(data.partOfSpeech)
            setDefinition(data.definition)
        }
    }

    const handleDelete = async () => {
        const response = await fetch(`${REACT_APP_BASE_URL}/words/${id}`,{
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
            setAlert({ show: true, variant: "danger", message: errArray.join(", ") });
        } else {
            setError([])
            navigate("/words")
        }
    }

    const updateWord = async () => {
        const response = await fetch(`${REACT_APP_BASE_URL}/words/${id}`,{
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
            setAlert({ show: true, variant: "danger", message: errArray.join(", ") });
        } else {
            setError([])
            setAlert({ show: true, variant: "success", message: "Word was updated successfully!" });
            getWord()
        }


    }

    useEffect(() => {
        getWord(id);
    }, [id]);

    useEffect(() => {
        if (alert.show) {
            const timer = setTimeout(() => {
                setAlert({ ...alert, show: false });
            }, 2000); // Auto-hide alert after 5 seconds
            return () => clearTimeout(timer);
        }
    }, [alert]);

  return (
      <AppLayout>

          <div className="px-0 my-3">
              {alert.show && <ShowAlert show={alert.show} variant={alert.variant} message={alert.message} />}
          </div>

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
