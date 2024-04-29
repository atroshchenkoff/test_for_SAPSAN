import { CSSProperties, MouseEvent } from 'react'
import styled from '@emotion/styled'

const ButtonComponent = ({
  text,
  className,
  onClick,
  style,
  fullWidth,
}: {
  text: string
  className?: string
  onClick?: (e: MouseEvent<HTMLElement>) => void
  style?: CSSProperties
  fullWidth?: boolean
}) => (
  <button className={className} onClick={onClick} style={style}>
    {text}
  </button>
)

const Button = styled(ButtonComponent)`
  height: 48px;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : '82px')};
  min-width: 82px;
  background: #eb0c0c;
  border: none;
  border-radius: 12px;

  font-family: 'SF Pro Display Regular', sans-serif;
  font-weight: 400;
  font-size: 16px;
  color: #fff;

  :hover {
    background: #c30000;
    cursor: pointer;
  }
`

export default Button
