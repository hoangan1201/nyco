const initialState = {
  pages: {
    colors: ['#93cbf5', '#3294E0','#c1c7f5','#A8DD7C','#c9eefe','#d2fcaf','#b0afe9','#81a1e6','#e0fff4','#54d4a6',],
    internal: false,
  },
  page: {},
  errors: [],
  isFetching: true,
  header: {},
  footer: {},
};

export default function pages(state = initialState) {
  return state;
}
// export default function pages(state = initialState, action) {
//   switch (action.type) {
//     case ADD_PAGE: {
//       const { path, data } = action.payload;
//       return {
//         ...state,
//         page: data,
//         pages: {
//           ...state.pages,
//           // [path.replace('/', '|')]: data,
//           [path]: data,
//         },
//         isFetching: false,
//         error: [],
//       };
//     }
//     case PAGES_API_REQUEST:
//       return {
//         ...state,
//         isFetching: true,
//         errors: [],
//       };
//     case PAGES_API_SUCCESS:
//       return {
//         ...state,
//         isFetching: false,
//         errors: [],
//       };
//     case PAGES_API_FAILURE: {
//       const { errors } = action;
//
//       return {
//         ...state,
//         isFetching: false,
//         errors,
//       };
//     }
//     default:
//       return state;
//   }
// }
