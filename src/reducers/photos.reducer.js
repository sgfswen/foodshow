import { combineReducers } from 'redux';
import { createSelector } from 'reselect';

import {
  FETCH_PHOTOS_REQUEST,
  FETCH_PHOTOS_SUCCESS,
  FETCH_PHOTOS_FAILURE,
  SELECT_PHOTO,
} from '../actions';


const initialState = {
  byId: {},
  allIds: [],
  currentPhotoId: null,
  isFetching: false,
};


// ////////////////////
// Reducers //////////
// //////////////////
const byId = (state = initialState.byId, { type, ...payload }) => {
  switch (type) {
    case FETCH_PHOTOS_SUCCESS:
      console.log('Success', state);
      Object.keys(payload.photos).forEach(id => {
        console.log('liked!', id, payload.photos[id].liked_by_user);
      });
      return {
        ...state,
        ...payload.photos,
      };

    default:
      return state;
  }
};

const allIds = (state = initialState.allIds, { type, ...payload }) => {
  switch (type) {
    case FETCH_PHOTOS_SUCCESS:
      return [
        ...state,
        ...payload.photoIds,
      ];

    default:
      return state;
  }
};

const currentPhotoId = (state = initialState.currentPhotoId, action) => {
  const { type, ...payload } = action;

  switch (type) {
    case SELECT_PHOTO:
      return payload.photoId;

    default:
      return state;
  }
};

const isFetching = (state = initialState.isFetching, { type }) => {
  switch (type) {
    case FETCH_PHOTOS_REQUEST:
      return true;

    case FETCH_PHOTOS_SUCCESS:
    case FETCH_PHOTOS_FAILURE:
      return false;

    default:
      return state;
  }
};

export default combineReducers({
  byId,
  allIds,
  currentPhotoId,
  isFetching,
});


// ////////////////////
// Selectors /////////
// //////////////////
const byIdSelector = state => state.photos.byId;
const allIdsSelector = state => state.photos.allIds;
const currentPhotoIdSelector = state => state.photos.currentPhotoId;

// Create an array of photos, for easy consumption.
// We need to take care to assign the ID to each object.
export const photosListSelector = createSelector(
  byIdSelector,
  allIdsSelector,
  (byId, allIds) => (
    allIds.map(id => ({
      ...byId[id],
      id,
    }))
  )
);

export const currentPhotoSelector = createSelector(
  byIdSelector,
  currentPhotoIdSelector,
  (byId, currentPhotoId) => byId[currentPhotoId]
);
