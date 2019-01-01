import { views } from "./utils/constants";
import Week from "./Week";
import Day from "./Day";

const VIEWS = {
  [views.WEEK]: Week,
  [views.DAY]: Day
};

export default VIEWS;
