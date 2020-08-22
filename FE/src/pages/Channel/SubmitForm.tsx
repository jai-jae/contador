import React, { useState } from "react";
import { SEND_MESSAGE } from "./Queries";
import { useMutation } from "@apollo/client";

interface IMessage {
    senderId: number,
    channelId: number,
    message: string
};


const MyForm = () => {
    const [values, setValues] = useState<IMessage>({
        senderId: 1, // initial values set from the root App
        channelId: 1, // initial values set from the root App
        message: ""
    });
    // if channelId or senderId is not set properly return to root

    const [sendMessage, { loading, error }] = useMutation(SEND_MESSAGE);
    // need to think how to handle send_message failure!!
    
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setValues({...values, message: value});
    };

    const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        sendMessage({ variables: {channelId: 1, content: values.message }});
        setValues({...values, message: ""});
    };

    return ( error ? <p>error!</p> :
        <form onSubmit={ submitHandler }>
            <input
                placeholder="write here!"
                name="message"
                value={ values.message }
                onChange={ onChange }
            />
            <button
                type="submit"
                disabled={ loading }>
                Yo!
            </button>
        </form>
    );
};

export default MyForm;