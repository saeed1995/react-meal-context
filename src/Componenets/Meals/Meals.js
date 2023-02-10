import { Fragment } from "react";

import MealsSummary from "./MealsSummary";
import AvailableMeals from "./AvailabeleMeals";

const Meals = () => {
  return (
    <Fragment>
      <MealsSummary />
      <AvailableMeals />
    </Fragment>
  );
};

export default Meals;
