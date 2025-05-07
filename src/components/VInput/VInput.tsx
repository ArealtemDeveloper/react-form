import styles from './VInput.module.css';
import cn from 'classnames';

export interface IInputProps {
    type: string,
    name: string,
    placeholder?: string,
    label?: string,
    description?: string,
    required?: boolean,
    disabled?: boolean,
    errors?: {[key: string]: string},
    icon?: React.ReactElement,
    size?: 'xs' | 'sm' | 'md' | 'lg',
    radius?: 'xs' | 'sm' | 'md' | 'lg',
    handleBlur?: (event: React.FocusEvent<HTMLInputElement>) => void,
    handleFocus?: (event: React.FocusEvent<HTMLInputElement>) => void,
};

function VInput({ 
    name, 
    type, 
    placeholder, 
    label, 
    description,
    required,
    disabled,
    errors,
    size = 'md',
    radius = 'md',
    icon,
    handleBlur,
    handleFocus,
}: IInputProps) {
  return (
    <div className={styles.container}>
        <label>
            <div className={cn(styles.labelsContainer, styles[size])}>
                <p className={styles.label}>
                    { label }
                    { required && <span className={styles.required}>*</span> }
                </p>

                { description && <span className={styles.description}>{description}</span> }
            </div>


            <div className={styles.inputWrapper}>
                {
                    icon 
                    && 
                    <span className={styles.icon}>
                        {icon}
                    </span>
                }

                <input
                    className={cn(
                        styles.input, 
                        styles[size],
                        styles[`rounded-${radius}`],
                        { [styles.error]: errors?.[name] },
                        { [styles._icon]: icon },
                    )}
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    disabled={disabled}
                    onBlur={handleBlur}
                    onFocus={handleFocus}
                />
            </div>


            { errors?.[name] && <span className={styles.error}>{ errors[name] }</span>}
        </label>
    </div>
  )
}

export default VInput