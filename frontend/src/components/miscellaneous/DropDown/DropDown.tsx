import React from "react";

export default function DropDown() {
  return (
    <div>
      <label htmlFor="cars">Choose a car:</label>
      <select name="cars" id="cars" defaultValue={"saab"}>
        <option value="volvo">Volvo</option>
        <option value="saab">Saab</option>
        <option value="mercedes">Mercedes</option>
        <option value="audi">Audi</option>
      </select>
    </div>
  );
}
