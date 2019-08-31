import React, { useState } from "react"
import { Slider } from "@material-ui/core"
import seedrandom from "seedrandom"
import "./App.css"

const week = 1
const meals = ["breakfast", "lunch", "dinner"]
const days = ["mon", "tue", "wed", "thur", "fri"]
const foods = ["junk", "mid", "healthy"]

const Options = ({ setHealthiness, healthiness }) => (
  <div style={{ width: 512 }}>
    <Slider
      defaultValue={50}
      valueLabelFormat={value => `${(value / 50 - 1).toFixed(1)}`}
      onChange={(_, value) => {
        setHealthiness(value / 50 - 1)
      }}
      valueLabelDisplay="off"
    />
  </div>
)
const Grid = ({ healthiness }) => (
  <div style={{ display: "flex", marginTop: 16, justifyContent: "center" }}>
    {meals.map(meal => (
      <div key={meal} style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ textAlign: "center", fontWeight: "bold" }}>{meal}</div>
        {days.map(day => {
          const thresholds = foods
            .map(food => seedrandom(`${week}.${day}.${meal}.${food}`)() * 2 - 1)
            .slice(1)
            .sort()
          const food =
            healthiness < thresholds[0]
              ? foods[0]
              : healthiness < thresholds[1]
              ? foods[1]
              : foods[2]
          return (
            <div
              key={meal + day}
              style={{
                margin: 8,
                height: 128,
                width: 128,
                backgroundImage: `url(./images/${food}.png)`,
                backgroundSize: "contain"
              }}
            ></div>
          )
        })}
      </div>
    ))}
  </div>
)

const App = () => {
  const [healthiness, setHealthiness] = useState(0)
  return (
    <div style={{ maxWidth: 512, margin: "2rem auto", textAlign: "center" }}>
      <h1 style={{ marginBottom: "2rem" }}>Week 1</h1>
      <Options
        healthiness={healthiness}
        setHealthiness={setHealthiness}
      ></Options>
      <Grid healthiness={healthiness}></Grid>
    </div>
  )
}

export default App
