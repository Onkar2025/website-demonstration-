import React from 'react';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowAltCircleLeft } from 'react-icons/fa';

const NotePage = () => {
  let { id } = useParams();
  let [note, setnote] = useState(null);
  let navigate = useNavigate();

  useEffect(() => {
    getnote();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  let getnote = async () => {
    if(id ==='new') return
    let response = await fetch(`/api/notes/${id}/`);
    let data = await response.json();
    setnote(data);
  };




  let createnote = async () => {
    await fetch(`/api/notes/create/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(note),
    });
  };


  let updatenote = async () => {
    await fetch(`/api/notes/${id}/update/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(note),
    });
  };

  let Deletenote = async () => {
    fetch(`/api/notes/${id}/delete/`, {
        method : 'delete',
        headers : {
            'content-type': 'application/json'
        }
    })
    navigate('/');
  }

  let HandleSubmit = () => {
    if(id !== 'new' && note.body ==='' ){
        Deletenote()
    }else if ( id !=='new'){
        updatenote()
    }else if(id === 'new' && note.body!== ''){
        createnote()
    }
    navigate('/');
  };

  return (
    <div className='note'>
      <div className='note-header'>
        <h3>
          <FaArrowAltCircleLeft onClick={HandleSubmit} />
          
        </h3>
        {id !== 'new' ?(
            <button onClick={Deletenote}>delete</button>
        ):(
            <button onClick={HandleSubmit}> Done </button>
        ) }
        
      </div>
      <textarea
        onChange={(e) => setnote({ ...note, 'body': e.target.value })}
        value={note?.body}
      ></textarea>
    </div>
  );
};

export default NotePage;
