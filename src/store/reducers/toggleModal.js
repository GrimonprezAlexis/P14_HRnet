const initialState = {
    isModalOpen: false
  };
  
  const toggleModal = (state = initialState, action) => {
    switch (action.type) {
      case "TOGGLE_MODAL":
        return {
          ...state,
          isModalOpen: !state.isModalOpen
        };
      default:
        return state;
    }
  };
  
  export default toggleModal;