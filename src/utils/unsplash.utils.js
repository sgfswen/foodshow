import Unsplash from 'unsplash-js';

import photosFixture from '../fixtures/photos.fixture';

// NOTE:
// Unsplash API has a rather unforgiving limit of 100 requests per hour.
// To avoid hitting that limit in development, we have the option to use
// a fixture, to stub the requests.
const useFixtures = true;


const unsplash = new Unsplash({
  applicationId: '2cc5f79ee1b4d8f8ef036bada6b0e1656239f2d96578addd18bd8f7fee9ff3f0',
  secret: '79adde5db99ee5cf6305639c4e92c117254315234c7ea418f951ca5a1ff18fc3',
  callbackUrl: 'localhost:3000/auth/callback',
});

const toJson = response => response.json();

export const login = () => {
  const authenticationUrl = unsplash.auth.getAuthenticationUrl([
    'public',
    'read_user',
    'write_likes',
  ]);

  location.assign(authenticationUrl);
};

export const fetchPhotos = ({ page = 1 } = {}) => {
  if (useFixtures) {
    return new Promise(resolve => resolve(photosFixture));
  }

  return unsplash.photos
    .searchPhotos('burger', [], page, 6)
    .then(toJson);
};
