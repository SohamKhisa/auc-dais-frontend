import React, {useEffect, useState} from "react";
import {Card, ListGroup} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import axios from "axios";
import {clear} from "@testing-library/user-event/dist/clear";
import {toast} from "react-toastify";


function Message (){

    let sender_id = localStorage.getItem('user_id');
    let receiver_id = 2;

    const [message, setMessage] = useState([]);
    const [sentMessage, setSentMessage] = useState([]);
    const [receivedMessage, setReceivedMessage] = useState([]);


    const fetchSentMessages = () => {
        let url = "http://localhost:8080/message/get/sender/" + sender_id +"/receiver/" + receiver_id;
        let url2 = "http://localhost:8080/message/get/sender/" + receiver_id +"/receiver/" + sender_id;

        axios({
            method: 'get',
            url: url,
            headers: {},
            data: {}
        })
            .then(response => response.data)
            .then(data => {
                console.log("sent messages: ");
                console.log(data);
                setSentMessage(data);
                setMessage(data);
            })
            .catch(error => {
                console.log(error);
                notify_error("Failed to load sent message");
            });

        axios({
            method: 'get',
            url: url2,
            headers: {},
            data: {}
        })
            .then(response => response.data)
            .then(data => {
                console.log("Received messages: ");
                console.log(data);
                setReceivedMessage(data);
            })
            .catch(error => {
                console.log(error);
                notify_error("Failed to load receive message");
            });


    }

    useEffect( () =>{
        fetchSentMessages();


    }, []);

    const padding_top ={
        paddingTop: '10px'
    }

    const padding_top_bottom_between_text ={
        paddingTop: '10px',
        paddingBottom: '10px'
    }

    const notify_error = (error_message) =>{
        toast.error(error_message,
            {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,

            })
    }

    const sendMessage = () => {
        let message = document.getElementById("message").value;
        let sender_id = 1;
        let receiver_id = 2;
        let url = "http://localhost:8080/message/send/sender/" + sender_id + "/receiver/" + receiver_id;

        // check if message is empty
        if(message === "" || message === null || message === undefined) {
            notify_error("Message cannot be empty");
        }
        else{
            axios({
                method: 'post',
                url: url,
                headers: {},
                data: {
                    message: message,
                }
            }).then(response => {
                if (response.data!=null){
                    if (response.status === 200){
                        alert("Message sent");
                    }
                    clear(document.getElementById("message"));
                } 
            }).catch(error => {
                console.log(error);
                notify_error("Failed to send message");
            });

        }


    }


    return (
        <div className="home-element-padding">
            <div className="card-container">
                <Card className={"bg-warning.bg-gradient"}>
                    <Card.Header className={"bg-warning text-white text-center"}> Send Message</Card.Header>
                        <div className='message-container'>
                            {message.length === 0 ? <div>No messages</div> :
                                <ListGroup>
                                    <ListGroup.Item variant="warning w-50 align-self-start rounded-pill shadow"
                                                    style={padding_top_bottom_between_text}>{message.length}</ListGroup.Item>

                                    <ListGroup.Item
                                        variant="info w-50 align-self-end rounded-pill d-flex justify-content-end shadow"
                                        style={padding_top_bottom_between_text}>Message from receiver blash
                                        blash blashdsajdhaksd dskjdbasmdnb dsakhjdkasbd</ListGroup.Item>
                                </ListGroup>
                            }

                            <div style={padding_top}>
                                <InputGroup className="mb-3" size="lg">
                                    <Form.Control
                                        placeholder="Type Message..."
                                        aria-label="Type Message..."
                                        aria-describedby="basic-addon2"
                                        id = "message"
                                    />
                                    <Button type={"submit"} variant="primary" onClick={sendMessage}>Send</Button>
                                </InputGroup>
                            </div>
                        </div>

                </Card>
            </div>
        </div>

    );
}

export default Message;
