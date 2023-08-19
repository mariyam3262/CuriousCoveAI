import {useState} from "react"


export const useData = () => {
    const [USERS, setUSERS] = useState([{name : "mariyam",
                                        email : "abc123@gmail.com",
                                        username : 'mariyam',
                                        password: '123'},

                                        {name : "shruti",
                                        email : "abc123@gmail.com",
                                        username : 'shruti123',
                                        password: '123'},
                                    
                                        {name : "vatsal",
                                        email : "abc123@gmail.com",
                                        username : 'vatsal555',
                                        password: '123'}
                                    ]);
        return {USERS, setUSERS} }