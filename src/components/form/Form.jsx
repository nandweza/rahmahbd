import { useState } from 'react';
import axios from 'axios';
import './form.css';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';
import SendIcon from '@mui/icons-material/Send';

const Form = ({ onMessageSubmit }) => {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [isExpand, setExpand] = useState(false);

  const MAX_CHARACTERS = 300;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if(name.trim() === '' || content.trim() === '') {
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:3002/api/message/create', {
        name,
        content,
      });
      const newMessage = response.data;
      onMessageSubmit(newMessage);
      setName('');
      setContent('');
    } catch (error) {
      console.log(error);
    }
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleContentChange = (event) => {
    const inputValue = event.target.value;

    if (inputValue.length <= MAX_CHARACTERS) {
      setContent(inputValue);
    }
  };

  const expand = () => {
    setExpand(true);
  };

  const characterCount = content.length;
  const progress = (characterCount / MAX_CHARACTERS) * 100;
  const circleClassName = progress === 100 ? 'progress-circle filled' : 'progress-circle';

  return (
    <form className="form" onSubmit={handleSubmit}>
      {isExpand && (
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleNameChange}
          placeholder="Enter your Name(s)"
        />
      )}
      <div className="textarea-container">
        <textarea
          name="content"
          onClick={expand}
          value={content}
          onChange={handleContentChange}
          placeholder="Write Birthday Wishes to Rahmah..."
          rows={isExpand ? 2 : 1}
        />
        <div className={circleClassName} style={{ background: progress === 100 ? 'red' : '#1da1f2' }}>
          {characterCount}
        </div>
      </div>
      <Zoom in={isExpand}>
        <Fab type="submit">
          <SendIcon />
        </Fab>
      </Zoom>
    </form>
  );
};

export default Form;

