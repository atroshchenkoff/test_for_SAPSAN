import axios from 'axios'

const UNSPLASH_API_CLIENT_ID = import.meta.env.VITE_UNSPLASH_API_CLIENT_ID || ''
const UNSPLASH_API = `https://api.unsplash.com/search/photos?client_id=${UNSPLASH_API_CLIENT_ID}`

export type Picture = {
  id: string
  slug: string
  created_at: Date
  updated_at: Date
  promoted_at: Date | null
  width: number
  height: number
  color: string
  blur_hash: string
  description: string | null
  alt_description: string | null
  urls: {
    raw: string
    full: string
    regular: string
    small: string
    thumb: string
    small_s3: string
  }
  links: {
    self: string
    html: string
    download: string
    download_location: string
  }
}

type UnsplashApiResponse = {
  total: number
  total_pages: number
  results: Picture[]
}

export const getPicturesByKeyword = async ({
  input,
}: {
  input: { keyword: string; page: number }
}): Promise<UnsplashApiResponse> => {
  const { keyword, page } = input
  try {
    const response = await axios.get(
      `${UNSPLASH_API}&query=${keyword}&page=${page}&per_page=25`
    )
    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
}
