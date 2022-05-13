import Context from '@/presentation/context/form-context';
import React, { useContext, useRef } from 'react';
import Styles from './input-styles.scss';

type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const Input: React.FC<Props> = (props: Props) => {
  const { state, setState } = useContext(Context);
  const inputRef = useRef<HTMLInputElement>();
  const error = state[`${props.name}Error`];

  const enableInput = (event: React.FocusEvent<HTMLInputElement>): void => {
    event.target.readOnly = false;
  };

  const handleChange = (event: React.FocusEvent<HTMLInputElement>): void => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
  };

  const getStatus = (): string => {
    return error ? '🔴' : '🟢';
  };

  const getTitle = (): string => {
    return error || 'Sucesso!';
  };

  return (
    <div className={Styles.inputWrap}>
      <input
        data-testid={props.name}
        ref={inputRef}
        {...props}
        placeholder=" "
        readOnly
        onFocus={enableInput}
        onChange={handleChange}
      />
      <label
        onClick={() => {
          inputRef.current.focus();
        }}
      >
        {props.placeholder}
      </label>
      <span
        data-testid={`${props.name}-status`}
        title={getTitle()}
        className={Styles.status}
      >
        {getStatus()}
      </span>
    </div>
  );
};

export default Input;
