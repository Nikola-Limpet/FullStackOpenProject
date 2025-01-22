const filterReducer = (state = '', action) => {
  switch (action.type) {
    case 'FILTER':
      return action.value
    default:
      return state
  }
}

export const searchValue = (value) => {
  return {
    type: 'FILTER',
    value: value
  }
}

export default filterReducer
