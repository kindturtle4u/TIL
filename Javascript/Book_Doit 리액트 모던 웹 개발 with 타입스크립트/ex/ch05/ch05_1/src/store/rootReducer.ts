import type {AppState} from './AppState'
import type {Actions} from './actions'

const initialAppState = {
  today: new Date()
}
export const rootReducer = (state: AppState = initialAppState, action: Actions) => {
  switch (action.type) {
    case 'setToday': {
      return {...state, today: action.today}
    }
  }
  return state // 반드시 있어야 합니다
}
