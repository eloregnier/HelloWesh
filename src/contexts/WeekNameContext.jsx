import React, { createContext, useState, useContext } from "react";

const WeekContext = createContext();

export const WeekProvider = ({ children }) => {
  const [weekName, setWeekName] = useState("rien");

  return (
    <WeekContext.Provider value={{ weekName, setWeekName }}>
      {children}
    </WeekContext.Provider>
  );
};

export const useWeekContext = () => {
  return useContext(WeekContext);
};
