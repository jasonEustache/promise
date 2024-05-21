export const getFirstResolvedPromise = (promises) => {
  return Promise.any(promises);
};

export const getFirstPromiseOrFail = (promises) => {
  return Promise.race(promises);
};

export const getQuantityOfRejectedPromises = (promises) => {
  return Promise.allSettled(promises).then((prom) => {
    const filter = prom.filter((obj) => {
      return obj.status === "rejected";
    });
    return filter.length;
  });
};

export const getQuantityOfFulfilledPromises = (promises) => {
  return Promise.allSettled(promises).then((prom) => {
    const filter = prom.filter((obj) => {
      return obj.status === "fulfilled";
    });

    return filter.length;
  });
};

//!  ⬇ ⬇ ⬇ ⬇ Don't Edit This Array ⬇ ⬇ ⬇ ⬇
export const allCharacters = [
  { id: 1, name: "billy" },
  { id: 2, name: "mandy" },
  { id: 3, name: "grim" },
];
//! ⬆  ⬆  ⬆  ⬆ do not edit this array   ⬆  ⬆  ⬆  ⬆ ️

//!  ⬇ ⬇ ⬇ ⬇ Don't Edit This Function ⬇ ⬇ ⬇ ⬇
export const fetchCharacterById = (id) => {
  // This function simulates an API, although most api's will return
  // simple data like this quickly, we want you to practice concurrent programming
  // so we're forcing each call to take one second

  const validIds = allCharacters.map((character) => character.id);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!validIds.includes(id))
        reject(`we do not have a character with the id of ${id}`);

      return resolve(allCharacters.find((character) => character.id === id));
    }, 1000);
  });
};
//! ⬆  ⬆  ⬆  ⬆ do not edit this function   ⬆  ⬆  ⬆  ⬆ ️

export const fetchAllCharactersByIds = async (ids) => {
  return Promise.allSettled(ids).then((id) => {
    if (id.length > 3) {
      return [];
    }
    const arrayOfIds = id.map((id) => {
      return id.value;
    });

    const promises = arrayOfIds.map((id) => {
      return fetchCharacterById(id);
    });

    return Promise.allSettled(promises).then((names) => {
      const array = names.map((name) => {
        return name.value;
      });
      return array;
    });
  });

  // To solve this you must fetch all characters passed in the array at the same time
  // use the `fetchCharacterById` function above to make this work
  //*  write code to pass test ⬇ ️
};
