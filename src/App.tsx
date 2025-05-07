import { useCallback, useState } from 'react';
import { ILoginForm, IRegisterForm } from './types/form';

import SignIn from "./components/SignIn/SignIn";
import SignUp from './components/SignUp/SignUp';

import './App.css';

function App() {
  const [isLogging, setIsLogging] = useState(true)
  
  const onSubmit = useCallback((inputs: ILoginForm | IRegisterForm) => {
    console.log(inputs);
  }, [])

  return (
      <div className='wrapper'>
          { isLogging 
          ? <SignIn
            onSubmit={onSubmit}
            changeForm={() => setIsLogging(false)}
          />
          : <SignUp
            onSubmit={onSubmit}
            changeForm={() => setIsLogging(true)}
          />
          }
      </div>
  );
}

export default App;
