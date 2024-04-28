import {
  CSSProperties,
  ChangeEvent,
  HTMLInputTypeAttribute,
  MouseEvent,
  useRef,
} from 'react'
import styled from '@emotion/styled'
import Icon, { IconType } from 'components/Icon'

const InputComponent = ({
  className,
  containerStyle,
  disabled,
  icon,
  allowClear = true,
  inputStyle,
  name,
  onChange,
  onClear,
  placeholder,
  readOnly,
  required,
  type,
  value,
  wrapperStyle,
  iconSize,
}: {
  className?: string
  containerStyle?: CSSProperties
  disabled?: boolean
  icon?: IconType
  allowClear?: boolean
  inputStyle?: CSSProperties
  name?: string
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  onClear?: (e: MouseEvent<HTMLElement>) => void
  placeholder?: string
  readOnly?: boolean
  required?: boolean
  type?: HTMLInputTypeAttribute
  value?: string
  wrapperStyle?: CSSProperties
  iconSize?: number
}) => {
  const inputRef = useRef(null)

  return (
    <div className={className} style={wrapperStyle}>
      <div className="container" style={containerStyle}>
        {icon && (
          <Icon dataTestId={`icon-${name}`} type={icon} size={iconSize} />
        )}
        <input
          ref={inputRef}
          aria-label={name}
          data-testid={name}
          tabIndex={0}
          type={type}
          name={name}
          onChange={onChange}
          placeholder={placeholder}
          value={value}
          style={inputStyle}
          disabled={disabled}
          readOnly={readOnly}
        />
        {allowClear && value && (
          <Icon
            dataTestId="icon-clear"
            type={'close'}
            size={20}
            style={{ top: 14, right: 10, padding: 0, cursor: 'pointer' }}
            onClick={onClear}
          />
        )}
      </div>
    </div>
  )
}

const Input = styled(InputComponent)`
  position: relative;
  width: 100%;
  min-width: 87px;

  .container {
    width: 100%;
  }

  input {
    font-family: 'Arial', sans-serif;
    height: 45px;
    padding-top: 3px;
    padding-left: 32px;
    padding-right: ${({ allowClear = true }) => `${allowClear ? 32 : 0}px`};
    width: -webkit-fill-available;
    font-size: 16px;
    border: none;
    border-radius: 12px;
    transition:
      border,
      color 0.2s ease-in-out;
    background: #eee;

    ::placeholder {
      color: #9c9c9c;
      font-weight: 400;
      font-size: 16px;
    }

    :hover {
      background: #e6e6e6;
    }

    :focus {
      outline: 0;
    }
  }
`

export default Input
