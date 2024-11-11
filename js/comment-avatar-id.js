import { getRandomInteger } from './util';

const createCommentAndAvatarId = function (a,b) {
  const previousId = [];
  return function () {
    let currentId = getRandomInteger(a,b);
    while (previousId.includes(currentId)) {
      currentId = getRandomInteger(a,b);
      if (previousId.length >= b - a) {
        return a;
      }

    }
    previousId.push(currentId);
    return currentId;
  };
};

const createRandomCommentId = createCommentAndAvatarId(1,1000);
const createRandomAvatarId = createCommentAndAvatarId(1,6);

export {createRandomAvatarId};
export {createRandomCommentId};
