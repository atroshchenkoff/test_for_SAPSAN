import { assign, setup, fromPromise, raise } from 'xstate'
import { Picture, getPicturesByKeyword } from 'actions/searchActions'

const PER_PAGE_STRING = import.meta.env.VITE_PER_PAGE || 25
const PER_PAGE = Number(PER_PAGE_STRING)

interface SearchMachineContext {
  picturesFromCurrentPage: Picture[]
  pictures: Picture[]
  picturePlugs: number[]
  totalPictures: number
  totalPages: number
  page: number
  isEmpty: boolean
  isSearchStarted: boolean
  searchText: string
}

export type SearchMachineEvent =
  | { type: 'TYPE_SEARCH'; searchText: string }
  | { type: 'NEW_SEARCH' }
  | { type: 'LOAD_NEXT_PAGE' }
  | { type: 'CREATE_PICTURE_PLUGS' }

export type SearchMachineSendAction = (event: SearchMachineEvent) => void

export const searchMachine = setup({
  types: {} as {
    context: SearchMachineContext
    events: SearchMachineEvent
  },
  actors: {
    getPictures: fromPromise(getPicturesByKeyword),
  },
}).createMachine({
  id: 'searchMachine',
  context: {
    picturesFromCurrentPage: [],
    pictures: [],
    picturePlugs: [],
    totalPictures: 0,
    totalPages: 0,
    page: 0,
    isEmpty: false,
    isSearchStarted: false,
    searchText: '',
  },
  initial: 'idle',
  on: {
    TYPE_SEARCH: {
      actions: assign({
        searchText: ({ event }) => event.searchText,
      }),
    },
    NEW_SEARCH: {
      actions: assign({
        picturesFromCurrentPage: () => [],
        pictures: () => [],
        picturePlugs: () => [],
        totalPictures: () => 0,
        totalPages: () => 0,
        page: () => 1,
        isSearchStarted: () => true,
      }),
      target: '.loading',
    },
  },
  states: {
    idle: {},

    loading: {
      invoke: {
        src: 'getPictures',
        input: ({ context }) => ({
          keyword: context.searchText,
          page: context.page,
        }),
        onDone: {
          target: 'displayPictures',
          actions: assign({
            picturesFromCurrentPage: ({ event }) => event.output.results,
            totalPictures: ({ event }) => event.output.total,
            totalPages: ({ event }) => event.output.total_pages,
            isEmpty: ({ event }) => event.output.results.length === 0,
          }),
        },
        onError: {
          target: 'error',
        },
      },
    },

    displayPictures: {
      entry: [
        assign({
          pictures: ({ context }) => [
            ...context.pictures,
            ...context.picturesFromCurrentPage,
          ],
          picturePlugs: () => [],
        }),
      ],
      after: {
        1000: {
          actions: raise({ type: 'CREATE_PICTURE_PLUGS' }),
        },
      },
      on: {
        LOAD_NEXT_PAGE: {
          actions: assign({
            page: ({ context }) =>
              context.page < context.totalPages
                ? context.page + 1
                : context.page,
          }),
          target: 'loading',
          guard: ({ context }) => {
            return context.page < context.totalPages
          },
        },
        CREATE_PICTURE_PLUGS: {
          actions: assign({
            picturePlugs: ({ context }) => {
              const { totalPictures, pictures } = context
              const difference = totalPictures - pictures?.length
              const plugsCount = difference < PER_PAGE ? difference : PER_PAGE
              const plugs = Array(plugsCount)
                .fill(0)
                .map((_, i) => i + 1)
              return plugs
            },
          }),
        },
      },
    },

    error: {},
  },
})
