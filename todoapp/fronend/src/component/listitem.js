import React from 'react'
import { Link } from 'react-router-dom'

let gettitle = (note) => {
  let title = note.body.split('\n')[0]
  if(title.length > 45 )
  {
    return title.slice(0,45)
  }
  return title 
}

let gettime = (note) => 
{

  return  new Date(note.updated).toLocaleDateString()
}

let getcontent = (note) => {
  let title = gettitle(note)
  let content = note.body.replaceAll('\n', ' ')
  content = content.replaceAll(title,'')
  if(content.length > 45 ){
    return content.slice(0,45) + '...'
  }else{
    return content
  }

}


const Listitem = ({note}) => {
  return (
    <Link to={`/notes/${note.id}`}>
      <div className="notes-list-item"></div>
      <h3>
        {gettitle(note)}
        <p>{gettime(note)}
        <span>{getcontent(note)}</span>
        </p>
      </h3>
    </Link>
  )
}

export default Listitem
