import React, { useState } from "react"
import { Slider } from "@material-ui/core"
import seedrandom from "seedrandom"
import "./App.css"

const meals = ["breakfast", "lunch", "dinner"]
const days = ["mon", "tue", "wed", "thur", "fri"]
const foods = ["junk", "mid", "healthy"]

const App = () => {
  const [healthiness, setHealthiness] = useState(0)
  const [week, setWeek] = useState(1)
  const navStyle = { fontSize: "1.8rem", margin: "0 8px", cursor: "pointer" }
  return (
    <div
      style={{
        maxWidth: 608,
        margin: "2rem auto",
        textAlign: "center",
        display: "flex"
      }}
    >
      <div>
        <h1 style={{ marginBottom: "3rem" }}>
          <span
            style={{ opacity: week === 1 ? 0.1 : 1, ...navStyle }}
            onClick={() => setWeek(Math.max(0, week - 1))}
            direction={-1}
            children="⏪"
          />
          <span>Week {week}</span>
          <span
            style={navStyle}
            onClick={() => setWeek(week + 1)}
            direction={1}
            children={"⏩"}
          />
        </h1>
        <Options setHealthiness={setHealthiness}></Options>
        <Grid healthiness={healthiness} week={week}></Grid>
      </div>
    </div>
  )
}

const Options = ({ setHealthiness }) => (
  <div style={{ width: 420, margin: "2rem auto" }}>
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

const Grid = ({ healthiness, week }) => (
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

export default App
