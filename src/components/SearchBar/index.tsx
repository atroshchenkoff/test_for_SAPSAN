import Button from 'components/Button'
import Input from 'components/Input'
import { SearchMachineSendAction } from 'machines/searchMachine'
import { memo, useCallback } from 'react'
import s from './searchBar.module.sass'

function SearchBarComponent({
  isSearchStarted,
  searchText,
  sendToSearchMachine,
}: {
  isSearchStarted: boolean
  searchText: string
  sendToSearchMachine: SearchMachineSendAction
}) {
  const handleStartSearch = () => {
    window.scrollTo({
      top: -1,
    })

    sendToSearchMachine({ type: 'NEW_SEARCH' })
  }

  const handleSearchInputChange = useCallback(({ target: { value } }) => {
    sendToSearchMachine({ type: 'TYPE_SEARCH', searchText: value })
  }, [])

  const handleSearchInputClear = useCallback(() => {
    sendToSearchMachine({ type: 'TYPE_SEARCH', searchText: '' })
  }, [])

  return (
    <div className={s.searchBarContainer}>
      <div
        className={s.searchWrapper}
        style={
          !isSearchStarted
            ? {
                marginTop: '33vh',
              }
            : undefined
        }
      >
        <div
          className={s.searchContainer}
          style={{
            marginLeft: `${isSearchStarted ? 0 : 'auto'}`,
          }}
        >
          <Input
            required
            icon="search"
            type="searchText"
            name="searchText"
            placeholder="Телефоны, яблоки, груши..."
            value={searchText}
            onChange={handleSearchInputChange}
            onClear={() => handleSearchInputClear()}
            iconSize={23}
            onKeyUp={(e) => e.key === 'Enter' && handleStartSearch()}
          />
          <Button text="Искать" onClick={handleStartSearch} />
        </div>
      </div>
    </div>
  )
}

const SearchBar = memo(SearchBarComponent)

export default SearchBar
