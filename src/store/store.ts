import Vue from "vue";
import Vuex from "vuex";
import { IProjectState } from "./modules/ProjectModule";

Vue.use(Vuex);

export interface IRootState {
  project: IProjectState;
}

// Declare empty store first, dynamically register all modules later.
export default new Vuex.Store<IRootState>({});
