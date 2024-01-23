import React , { useEffect, useState } from "react"
import Listitem from "../component/listitem"
import Addbutton from "../component/addbutton"


const NotesList = () => {
    let [notes , setNote ] = useState([])
    useEffect(() =>{
        getNote()
    },[])
    let getNote = async () =>
    {
        let responce = await fetch('/api/notes/')
        let data = await responce.json()
        setNote(data)
    }
  return (
    <div className="notes">
      <div className="notes-header">  
          <h2 className="notes-titel"> &#9782; Notes</h2>
          <p className = "note-count"> {notes.length}</p>
      </div>
      <div className="notes-list">
        {notes.map((note , index) => (
          <Listitem key = {index} note = {note}/>
        ))}
      </div>
        <Addbutton/>
    </div>
  )
}

export default NotesList
