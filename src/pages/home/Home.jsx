import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './home.css';
import Form from '../../components/form/Form';
import Balloons from '../../components/balloons/Balloons';
import Rahmah5 from '../../media/Rahmah5.jpg';
import Rahmah4 from '../../media/Rahmah4.jpg';
import Rahmah3 from '../../media/Rahmah3.jpg';
import Rahmah2 from '../../media/Rahmah2.jpg';
import rs from '../../media/rs.jpg';
// import love from '../../media/love.png';
import August from '../../media/August.png';
import Queen from '../../media/Queen.png';
import SongPlayer from '../../components/songPlayer/SongPlayer';

const Home = () => {
  const [messages, setMessages] = useState([]);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get('https://rahmah-birthday-api.onrender.com/api/message/');
        setMessages(response.data);
        setCurrentMessageIndex(response.data.length - 1); // Set currentMessageIndex to the last message index
      } catch (err) {
        console.log(err);
      }
    };

    fetchMessages();
  }, []);

  useEffect(() => {
    const slideLoop = setInterval(() => {
      setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 10000);

    return () => {
      clearInterval(slideLoop);
    };
  }, [messages]);

  const addNewMessage = (message) => {
    setMessages((prevMessages) => [message, ...prevMessages]);
    setCurrentMessageIndex(0); // Set currentMessageIndex to the newly added message index
  };

  const getTimeInGeorgia = (date) => {
    const options = {
      timeZone: 'America/New_York', // Georgia state time zone
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    };
    return date.toLocaleString(undefined, options);
  };

  return (
    <div className="home">
      <Balloons />
      <div className="d-flex justify-content-center align-items-center h-100">
        <div className="container">
          <div className="row pt-2">
            <div className="col-lg-2 pt-5">
              <img 
                src={August} 
                alt=''
                width='80'
                height='80'
                className='small-screen'
              />
              <img 
                src={Queen}
                alt=''
                width='80'
                height='80'
                className='small-screen show-img'
              />
            </div>
            <div className="col-lg-8">
              <Form onMessageSubmit={addNewMessage} />
              <div className='text-center'>
                <SongPlayer />
              </div>
            </div>
            <div className="col-lg-2 pt-5">
              <img 
                src={Queen}
                alt=''
                width='100'
                height='100'
                className='hide-img'
              />
            </div>
          </div>
          {/* <div className="hide">
            <img
              src={love}
              alt="Rahmah's pic for viewing on screens <=767px"
              className="img-responsive start"
              width=""
              height=""
            />
          </div> */}
          <div className="img-grid mx-5">
            <div className="img-col p-2">
              <div className="card start">
                <img
                  src={Rahmah5}
                  alt="Rahmah's pic"
                  className="img-responsive start"
                  width="180"
                  height="250"
                />
              </div>
            </div>
            <div className="img-col p-2">
              <div className="card mid-end">
                <img
                  src={Rahmah2}
                  alt="Rahmah's pic"
                  className="img-responsive"
                  width="190"
                  height="275"
                />
              </div>
            </div>
            <div className="img-col p-2">
              <div className="card mid">
                <img
                  src={rs}
                  alt="Rahmah's pic"
                  className="img-responsive"
                  width="200"
                  height="300"
                />
              </div>
            </div>
            <div className="img-col p-2">
              <div className="card mid-end">
                <img
                  src={Rahmah3}
                  alt="Rahmah's pic"
                  className="img-responsive"
                  width="190"
                  height="275"
                />
              </div>
            </div>
            <div className="img-col p-2">
              <div className="card end">
                <img
                  src={Rahmah4}
                  alt="Rahmah's pic"
                  className="img-responsive end"
                  width="180"
                  height="250"
                />
              </div>
            </div>
          </div>
          {messages.length > 0 ? (
            <div className="message">
              <p className="date text-center text-muted">
                {getTimeInGeorgia(new Date(messages[currentMessageIndex].createdAt))}
              </p>
              <p className="text">{messages[currentMessageIndex].content}</p>
              <p className="name fw-bold">{messages[currentMessageIndex].name}</p>
            </div>
          ) : (
            <p className='text-center fw-bold'>Happy Birthday Dear Rahmah</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
