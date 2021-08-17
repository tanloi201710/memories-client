
import { CREATE, DELETE, END_LOADING, FETCH_ALL, FETCH_BY_SEARCH, FETCH_POST, LIKE, START_LOADING, UPDATE } from '../constants/actionTypes';

const postsReducer = (state = { isLoading: true, posts: [] }, action) => {
    switch (action.type) {
        case START_LOADING:
            return { ...state, isLoading: true };

        case END_LOADING:
            return { ...state, isLoading: false };

        case FETCH_ALL:
            return {
                ...state,
                posts: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPage: action.payload.numberOfPage,
            };

        case FETCH_BY_SEARCH:
            return { ...state, posts: action.payload.data };
    
        case FETCH_POST:
            return { ...state, post: action.payload.post };

        case CREATE:
            return {...state, posts: [...state.posts, action.payload]};

        case UPDATE:
        case LIKE:
            return { ...state, posts: state.posts.map((post) => post._id === action.payload._id ? action.payload : post)};

        case DELETE:
            return {...state, posts: state.posts.filter((post) => post._id !== action.payload)};

        default:
            return state;
    }
}

export default postsReducer;