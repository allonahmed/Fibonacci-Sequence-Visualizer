import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { increase, editColor, setActive, increaseBy, reset } from "./reducers";
import Typewriter from "typewriter-effect";
import { motion, AnimatePresence, useCycle } from "framer-motion";
import { scientificNotation } from "./helper.math";
import { InlineMath } from "react-katex";
import ScrollTo from "react-scroll-into-view";
import Illustration from "./Frame.svg";
import { WindupChildren, Pace, Pause, Effect } from "windups";

import "./App.css";
import "katex/dist/katex.min.css";

function App() {
  const sequences = useSelector((state) => state.addFibonacci); //redux object that contains fib sequence
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const [delay, setDelay] = useState(false);
  const [count, setCount] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    dispatch(editColor(sequences.length - 1));
    dispatch(setActive(sequences.length - 1));
    let scroll = document.getElementById(`item${sequences.length - 1}`);
    let time = 0;
    if (count === 1) {
      time = 0;
    } else {
      time = count * 2;
    }
    setTimeout(() => scroll.scrollIntoView(), time);
  }, [sequences.length, count]);

  useEffect(() => {
    if (value > 200) {
      setError("Value to large");
    } else {
      setError("");
    }
  }, [value]);

  return (
    <div className="App">
      <div className="header">
        <img className="illustration" src={Illustration} />

        <WindupChildren>
          <Pace ms={50}>
            <h2 style={{ padding: "0", margin: "0" }}>
              {"Fibonacci Sequence"}
            </h2>
          </Pace>
          <Pause ms={300} />
          <h5 style={{ padding: "10px", margin: "0" }}>
            {"Get up to 200 Fibonacci sequences where f(n) = f(n-1) + f(n-2)"}
          </h5>
        </WindupChildren>
      </div>

      <div className="controls">
        {" "}
        <button
          className="add"
          onClick={() => {
            setCount(1);
            setDelay(false);
            dispatch(increase());
            dispatch(editColor(sequences.length));
            setValue(parseInt(value) + 1);
          }}
        >
          ＋add
        </button>
        <button
          className="add"
          onClick={() => {
            setValue(0);
            setCount(0);
            dispatch(reset());
          }}
        >
          − reset
        </button>
        <label htmlFor="sequence">
          <input
            type="number"
            id="sequence"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />

          <button
            disabled={error.length !== 0}
            type="submit"
            className="sequence-button button"
            onClick={() => {
              setCount(value);
              setDelay(true);
              dispatch(reset());
              for (let i = 0; i <= value; i++) {
                dispatch(increase());
              }
            }}
          >
            Get sequence
          </button>
          <div>{error}</div>
        </label>
        <button
          className="button"
          onClick={() => {
            const results = sequences.map((s) => {
              return s.value;
            });
            console.log(results);
            navigator.clipboard.writeText(`{${results}}`);
          }}
        >
          {" "}
          copy
        </button>
      </div>

      <AnimatePresence>
        <div className="list-heading">
          {" "}
          <p>Sequence</p>
          <p>Value</p>
        </div>
        <div className="list-container" id="list-container">
          {sequences.map((element, id) => {
            return (
              <motion.li
                style={
                  delay
                    ? {
                        color: element.color,
                        animationDelay: `calc(${id} * 10ms)`
                      }
                    : {
                        color: element.color
                      }
                }
                key={id}
                onMouseOver={() => {
                  dispatch(editColor(id));
                  dispatch(setActive(id));
                  console.log(id);
                }}
                id={`item${id}`}
              >
                <div
                  style={
                    element.active
                      ? { color: "rgba(0,200,50,1)", paddingLeft: "12px" }
                      : { color: "black", paddingLeft: "12px" }
                  }
                >
                  {id}.
                </div>
                {id > 1 && element.active ? (
                  <p
                    style={{
                      display: "flex",
                      position: "relative",
                      alignItems: "center",
                      margin: "2px",
                      paddingRight: "5px",
                      color: element.color
                    }}
                  >
                    <InlineMath
                      math={scientificNotation(sequences[id - 2].value)}
                    />
                    <span
                      style={{
                        padding: "0px 5px"

                        // fontSize: "22px"
                      }}
                    >
                      {" "}
                      ＋
                    </span>
                    <InlineMath
                      math={scientificNotation(sequences[id - 1].value)}
                    />
                    <span style={{ padding: "0px 8px" }}> = </span>
                    <InlineMath math={scientificNotation(element.value)} />
                  </p>
                ) : (
                  <p
                    style={{
                      display: "flex",
                      position: "relative",
                      alignItems: "center",
                      margin: "2px",
                      paddingRight: "5px",
                      color: element.color
                    }}
                  >
                    <InlineMath math={scientificNotation(element.value)} />
                  </p>
                )}
              </motion.li>
            );
          })}
        </div>
      </AnimatePresence>
    </div>
  );
}

export default App;
