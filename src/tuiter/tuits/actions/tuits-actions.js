import * as service from "../../../services/tuits-service";

export const CREATE_TUIT = "create_tuit";
export const DELETE_TUIT = "delete_tuit";
export const FIND_ALL_TUITS = "find_all_tuits";
export const UPDATE_TUIT = "update_tuit";

export const createTuit = async (dispatch, tuit) => {
  const newTuit = await service.createTuit(tuit);
  dispatch({
    type: CREATE_TUIT,
    newTuit,
  });
};

export const updateTuit = async (dispatch, tuit) => {
  const status = await service.updateTuit(tuit);
  dispatch({
    type: UPDATE_TUIT,
    tuit,
  });
};
