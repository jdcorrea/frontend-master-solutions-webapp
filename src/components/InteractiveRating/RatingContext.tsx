import { PropsWithChildren, createContext, useReducer, Dispatch, useContext } from 'react'

//variables
const initialRating: TratingData = {
  isRated: false,
  ratingNumber: 5,
  selectedRatingByUser: -1
}

const RatingContext = createContext<{
  ratingData: TratingData;
  dispatch: Dispatch<any>;
}>({
  ratingData: initialRating,
  dispatch: () => null
})
RatingContext.displayName = 'RatingContext'

export function RatingProvider ( { children, ratingNumber } : Props ) {
  const [ratingData, dispatch] = useReducer(
    ratingReducer,
    { ...initialRating, ratingNumber }
  )

  return (
    <RatingContext.Provider value={{ratingData, dispatch}} >
        { children }
    </RatingContext.Provider>
  )
}

// types
interface Props extends PropsWithChildren {
  ratingNumber: number,
}

type TratingData = {
  isRated: boolean,
  ratingNumber: number,
  selectedRatingByUser: number
}

type Action =
  | { type: 'updateRated'; payload: boolean }
  | { type: 'updateRatingNumber'; payload: number }
  | { type: 'updateSelectedRatingByUser'; payload: number }

//functions
function ratingReducer(ratingData: TratingData, action: Action) {
  switch (action.type) {
    case 'updateRated': 
      return {
        ...ratingData,
        isRated: action.payload
      
    }
    case 'updateRatingNumber': 
      return {
        ...ratingData,
        ratingNumber: action.payload
      
    }
    case 'updateSelectedRatingByUser': 
      return {
        ...ratingData,
        selectedRatingByUser: action.payload
      
    }
    default: {
      return ratingData
    }
  }
}

export function useRatings() {
  return useContext(RatingContext)
}
