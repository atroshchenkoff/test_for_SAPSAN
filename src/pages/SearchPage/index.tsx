import { useEffect } from 'react'
import { useMachine } from '@xstate/react'
import { searchMachine as searchMachineDefinition } from 'machines/searchMachine'

import SearchBar from 'components/SearchBar'
import Gallery from 'components/Gallery'

function SearchPage() {
  const [searchMachine, sendToSearchMachine] = useMachine(
    searchMachineDefinition
  )

  const { pictures, picturePlugs, isEmpty, isSearchStarted, searchText } =
    searchMachine.context

  const handleScroll = () => {
    // Проверяем, если пользователь пролистал до элемента-заглушки в конце списка
    const lastListItem = document.getElementById('first-plug')
    if (
      lastListItem &&
      lastListItem.getBoundingClientRect().bottom <= window.innerHeight
    ) {
      sendToSearchMachine({ type: 'LOAD_NEXT_PAGE' }) // Загружаем следующую страницу
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      <SearchBar
        isSearchStarted={isSearchStarted}
        searchText={searchText}
        sendToSearchMachine={sendToSearchMachine}
      />

      <Gallery
        isEmpty={isEmpty}
        pictures={pictures}
        picturePlugs={picturePlugs}
        sendToSearchMachine={sendToSearchMachine}
      />
    </>
  )
}

export default SearchPage
