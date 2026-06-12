import { createContext, useState } from 'react';

export const LoginContext = createContext(null);

const ContextProvider = ({children}) => {

    const [ account, setAccount ] = useState('');
    const [ open, setOpen ] = useState(false);
    
    return (
        <LoginContext.Provider value={{ account, setAccount, open, setOpen }}>
            {children}
        </LoginContext.Provider>
    )
}

export default ContextProvider;