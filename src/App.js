import React, { useState } from "react"
import { Slider } from "@material-ui/core"
import seedrandom from "seedrandom"

const meals = ["breakfast", "lunch", "dinner"]
const days = ["mon", "tue", "wed", "thur", "fri"]
const foods = ["junk", "mid", "healthy"] // public/images/junk.png

export default () => {
  const [week, setWeek] = useState(1)
  const [target, setTarget] = useState(0) // from -1 to 1
  return (
    <div
      style={{
        maxWidth: 432,
        margin: "2rem auto",
        textAlign: "center",
        display: "flex"
      }}
    >
      <div>
        <Header week={week} setWeek={setWeek} />
        <Options setTarget={setTarget} />
        <Grid target={target} week={week} />
      </div>
    </div>
  )
}

const Header = ({ week, setWeek }) => {
  const navStyle = { fontSize: "1.8rem", margin: "0 8px", cursor: "pointer" }
  return (
    <h1 style={{ marginBottom: "3rem", "user-select": "none" }}>
      <span
        style={{
          opacity: week === 1 ? 0.1 : 1,
          pointerEvents: week === 1 ? "none" : "all",
          ...navStyle
        }}
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
  )
}

const Options = ({ setTarget }) => (
  <div style={{ width: 420, margin: "2rem auto" }}>
    <Slider
      defaultValue={50}
      valueLabelFormat={value => `${(value / 50 - 1).toFixed(1)}`}
      onChange={(_, value) => setTarget(value / 50 - 1)}
      valueLabelDisplay="off"
    />
  </div>
)

const Grid = ({ target, week }) => (
  <div
    style={{
      display: "flex",
      marginTop: 16,
      justifyContent: "center",
      fontWeight: "bold"
    }}
  >
    <div style={{ marginTop: 0 }}>
      {days.map(day => (
        <div style={{ textAlign: "right", margin: "80px 0 126px 0" }}>
          {day}
        </div>
      ))}
    </div>
    {meals.map(meal => (
      <div key={meal} style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ textAlign: "center" }}>{meal}</div>
        {days.map(day => (
          <GridItem week={week} day={day} meal={meal} target={target} />
        ))}
      </div>
    ))}
  </div>
)

const GridItem = ({ week, day, meal, target }) => {
  const threshold = foods
    .map(food => seedrandom(`${week}.${day}.${meal}.${food}`)() * 2 - 1)
    .slice(1)
    .map(t => target >= t)
    .filter(Boolean).length
  const foodItem = foods[threshold]
  return (
    <div
      key={meal + day}
      style={{
        margin: 8,
        height: 128,
        width: 128,
        backgroundImage: `url(./images/${foodItem}.png)`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center"
      }}
    ></div>
  )
}
