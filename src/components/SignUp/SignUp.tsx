import { useCallback, useRef, useState } from 'react';
import { IconAt } from '@tabler/icons-react';
import { IRegisterForm } from '../../types/form';

import VInput from '../VInput/VInput';
import VRadio from '../VRadio/VRadio';

import styles from './SignUp.module.css';

interface IProps {
  onSubmit: (inputs: IRegisterForm) => void,
  changeForm: () => void,
};

interface IErrors {
  [key: string]: string
};

const initialState = { 
  name: '', 
  nickname: '',
  email: '',
  gender: '',
  password: '',
  repeatedPassword: '',
};

function SignUp( props: IProps ) {
  const formRef = useRef<HTMLFormElement>(null);

  const [inputs, setInputs] = useState<IRegisterForm>(initialState);
  const [errors, setErrors] = useState<IErrors>(initialState);

  const nickNameIcon = <IconAt size={16} />;

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
        <h1>SignUp</h1>

        <form
          ref={formRef}
          className={styles.form}
          onSubmit={handleSubmit}
          onChange={handleChange}
          onReset={handleReset}
        >
          <VInput
            label='Имя'
            name='name'
            type="text"
            placeholder='Имя' 
            required={true}
            errors={errors}
            size='md'
            radius='sm'
            handleBlur={onBlur}
            handleFocus={onFocus}
          />
          <VInput
            label='Ник'
            name='nickname'
            type="text"
            placeholder='Ник' 
            size='md'
            radius='sm'
            icon={nickNameIcon}
          />
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
          <VRadio
            title='Пол'
            name='gender'
            size='md'
            firstVal='M'
            secondVal='F'
            labelFirst='Мужской'
            labelSecond='Женский'
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

          <VInput
            label='Повтор пароля'
            name='repeatedPassword'
            type="password" 
            placeholder='Повторить пароль'
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
            disabled={!inputs.name || !inputs.email || !inputs.password || !inputs.repeatedPassword}
          >
              Зарегистрироваться
          </button>

          <div className={styles.redirect}>
            <span>
              Есть аккаунт? 
            </span> 

            <button 
              className={styles.redirectBtn}
              onClick={props.changeForm}
            >
              Войти
            </button>
          </div>
        </form>
    </div>
  )
}

export default SignUp;