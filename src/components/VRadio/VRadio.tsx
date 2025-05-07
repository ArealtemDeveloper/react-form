import { useState } from 'react';
import styles from './VRadio.module.css';
import cn from 'classnames';

export interface IRadioProps {
    labelFirst: string,
    labelSecond: string,
    firstVal: string,
    secondVal: string,
    name: string,
    title: string,
    size?: 'xs' | 'sm' | 'md' | 'lg',
};

function VRadio({
    firstVal,
    secondVal,
    labelFirst, 
    labelSecond, 
    name, 
    title,
    size = 'md'
}: IRadioProps) {
  const [selected, setSelected] = useState('');

  return (
    <div className={styles.container}>
        <span className={cn(styles.title, styles[size])}>
            { title }
        </span>

        <label>
            <span>{ labelFirst }</span>
            <input 
                type="radio"
                name={name}
                value={firstVal}
                checked={selected === firstVal}
                onChange={() => setSelected(firstVal)}
            />
        </label>

        <label>
            <span>{ labelSecond }</span>
            <input 
                type="radio"
                name={name}
                value={secondVal}
                checked={selected === secondVal}
                onChange={() => setSelected(secondVal)}
            />
        </label>
    </div>
  )
}

export default VRadio