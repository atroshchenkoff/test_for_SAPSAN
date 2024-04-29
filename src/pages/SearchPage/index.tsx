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

  const isLoading = searchMachine.matches('loading')

  return (
    <>
      <SearchBar
        isSearchStarted={isSearchStarted}
        searchText={searchText}
        sendToSearchMachine={sendToSearchMachine}
      />

      <Gallery
        isEmpty={isEmpty}
        isLoading={isLoading}
        pictures={pictures}
        picturePlugs={picturePlugs}
        sendToSearchMachine={sendToSearchMachine}
      />
    </>
  )
}

export default SearchPage
