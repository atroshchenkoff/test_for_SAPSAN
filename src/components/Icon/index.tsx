import styled from '@emotion/styled'
import { searchIcon } from 'assets/icons/search'
import { closeIcon } from 'assets/icons/close'
import { CSSProperties, MouseEvent } from 'react'

export type IconType = 'search' | 'close'

const iconResolver = (type: IconType) => {
  switch (type) {
    case 'search':
      return searchIcon

    case 'close':
      return closeIcon

    default:
      return <></>
  }
}

const IconComponent = ({
  className,
  dataTestId,
  onClick,
  style,
  type,
  size,
}: {
  type: IconType
  className?: string
  dataTestId?: string
  onClick?: (e: MouseEvent<HTMLElement>) => void
  style?: CSSProperties
  size?: number
}) => (
  <i
    role="presentation"
    aria-hidden="true"
    className={className}
    data-testid={dataTestId}
    onClick={onClick}
    style={style}
    tabIndex={-1}
  >
    {iconResolver(type)}
  </i>
)

const Icon = styled(IconComponent)`
  position: absolute;
  // font-size: ${({ size }) => `${size ? size + 1 : 20}px`};
  height: ${({ size }) => `${size ? size : 20}px`};
  padding-left: 10px;
  padding-top: 15px;
  transition: all 0.3s ease-in-out;
  z-index: 1;

  svg {
    height: ${({ size }) => `${size ? size : 20}px`};
    width: ${({ size }) => `${size ? size : 20}px`};
    fill: #c4c4c4;
  }
`

export default Icon
