import { useCallback, useRef, useState } from 'react';
import { ILoginForm } from '../../types/form';

import VInput from '../VInput/VInput';

import styles from './SignIn.module.css';

interface IProps {
  onSubmit: (inputs: ILoginForm) => void,
  changeForm: () => void,
};

interface IErrors {
  [key: string]: string
};

const initialState = { email: '', password: ''};

function SignIn( props: IProps ) {
  const formRef = useRef<HTMLFormElement>(null);

  const [inputs, setInputs] = useState<ILoginForm>(initialState);
  const [errors, setErrors] = useState<IErrors>(initialState);

  const handleChange = (event: React.FormEvent<HTMLFormElement>) => {
    const target = event.target as HTMLInputElement;

    setInputs(prevState => ({
      ...prevState,
      [target.name]: target.value,
    }))
  }

  const onBlur = useCallback((event: React.FocusEvent<HTMLInputElement>) => {
    if(!event?.target.value) {
      setErrors(prevState => ({
        ...prevState,
        [event?.target.name]: 'Обязательное поле',
      }))
    }
  },[])

  const onFocus = useCallback((event: React.FocusEvent<HTMLInputElement>) => {
    setErrors(prevState => ({
      ...prevState,
      [event?.target.name]: '',
    }))
  },[])

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  
    props.onSubmit(inputs);
    setInputs(initialState);

    formRef.current?.reset();
  }

  const handleReset = () => {
    setInputs(initialState);
    console.log('reset', initialState);
  }

  return (
    <div className={styles.container}>
        <h1>SignIn</h1>

        <form
          ref={formRef}
          className={styles.form}
          onSubmit={handleSubmit}
          onChange={handleChange}
          onReset={handleReset}
        >
          <VInput
            label='E-mail'
            name='email'
            type="email"
            placeholder='E-mail' 
            required={true}
            errors={errors}
            size='md'
            radius='sm'
            handleBlur={onBlur}
            handleFocus={onFocus}
          />
          <VInput
            label='Пароль'
            description='Пароль должен содержать не менее 6 символов'
            name='password'
            type="password" 
            placeholder='Пароль'
            size='md'
            radius='sm'
            required={true}
            errors={errors}
            handleBlur={onBlur}
            handleFocus={onFocus}
          />
          <button 
            className={styles.btn}
            type='submit'
            disabled={!inputs.email || !inputs.password}
          >
              Войти
          </button>
          
          <div className={styles.redirect}>
            <span>
              Нет аккаунта? 
            </span> 

            <button 
              className={styles.redirectBtn}
              onClick={props.changeForm}
            >
              Зарегистрироваться
              </button>
          </div>
        </form>
    </div>
  )
}

export default SignIn