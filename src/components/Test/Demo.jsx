import { useState } from "react";
import "../../assets/css/demo.css"

export const Demo = () => {

    const [selected, setSelected] = useState("");

    return (
      <div>
        {["Apple", "Banana", "Cherry"].map((fruit) => (
          <label
            key={fruit}
            className={`radio-label ${selected === fruit ? "selected" : ""}`}
          >
            <input
              type="radio"
              name="fruits"
              value={fruit}
              checked={selected === fruit}
              onChange={(e) => setSelected(e.target.value)}
            />
            {fruit}
          </label>
        ))}
      </div>
    )
}