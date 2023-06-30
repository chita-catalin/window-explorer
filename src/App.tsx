import { Card, Collapse } from "antd";
import { useState } from "react";
import AppLayout from "./AppLayout";
import React from "react";
import "./App.css";

export const AppContext = React.createContext<any>({});

const { Panel } = Collapse;

function App() {
  const [showEmptyObjects, setShowEmptyObjects] = React.useState(false);
  const [showUndefinedOrNull, setShowUndefinedOrNull] = React.useState(false);
  const [showFunctions, setShowFunctions] = React.useState(false);
  const [showObjectOwnPropertyNames, setShowObjectOwnPropertyNames] =
    React.useState(false);

  const myObject = typeof window !== "undefined" ? window : {};
  let result;

  if (showObjectOwnPropertyNames) {
    result = Object.getOwnPropertyNames(myObject)
      .sort((a: any, b: any) =>
        //@ts-ignore
        (typeof myObject[a]).toString() > (typeof myObject[b]).toString()
          ? -1
          : 1
      )
      .map((key) => [
        key,
        // @ts-ignore
        myObject[key],
      ]);
  } else {
    result = Object.keys(myObject)
      .sort((a: any, b: any) =>
        //@ts-ignore
        (typeof myObject[a]).toString() > (typeof myObject[b]).toString()
          ? -1
          : 1
      )
      .map((key) => [
        key,
        // @ts-ignore
        myObject[key],
      ]);
  }

  const [collapsedKeys, setCollapsedKeys] = useState([]);

  const visited = new Set();

  const styles: any = {
    container: {
      borderRadius: "6px",
      margin: "5px",
    },
    background: {
      string: "transparent",
      boolean: "transparent",
      number: "transparent",
      function: "transparent",
      object: "red",
      other: "transparent",
    },
  };

  const handleCollapse = (key: string) => {
    let newCollapsedKeys: any;
    // @ts-ignore
    if (collapsedKeys.includes(key)) {
      newCollapsedKeys = collapsedKeys.filter((k: string) => k !== key);
    } else {
      newCollapsedKeys = [...collapsedKeys, key];
    }
    setCollapsedKeys(newCollapsedKeys);
  };

  const renderItem = (item: any, keyPrefix: string, depth = 0) => {
    const [key, value] = item;
    let type = typeof value;
    if (type === "object" && value !== null) {
      if (visited.has(value)) {
        return null;
      }
      visited.add(value);
    }

    const containerStyle = {
      ...styles.container,
      padding: "5px",
      display: "flex",
      alignItems: "center",
      backgroundColor: "inherit",
      background: "rgba(255, 255, 255, 0.45)",
      borderRadius: "6px",
      boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
      border: "1px solid rgba(255, 255, 255, 0.3)",
    };

    if (type === "string" || type === "boolean" || type === "number") {
      return (
        <Card
          key={`${keyPrefix}`}
          style={{
            ...containerStyle,
            background:
              type === "string"
                ? "rgba(155, 255, 155, 0.45)"
                : type === "boolean"
                ? "rgba(255, 155, 255, 0.45)"
                : "rgba(255, 255, 155, 0.45)",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>{key.toString()}</span>
            <span>{String(value)}</span>
          </div>
        </Card>
      );
    } else if (type === "function" && showFunctions) {
      return (
        <Card
          key={`${keyPrefix}`}
          style={{
            ...containerStyle,
            background: "rgba(205, 255, 255, 0.45)",
          }}
        >
          <span>
            <b>{key}()</b>
          </span>
        </Card>
      );
    } else if (type === "object" && value !== null) {
      if (
        (Object.getOwnPropertyNames(value).length > 0 &&
          showObjectOwnPropertyNames) ||
        (Object.keys(value).length > 0 && !showObjectOwnPropertyNames)
      ) {
        return (
          <Card key={`${keyPrefix}`} style={containerStyle}>
            <span
              style={{
                zIndex: 999,
                fontWeight: "bolder",
                fontSize: "1.1em",
                height: "fit-content",
                whiteSpace: "nowrap",
              }}
            >
              {key} ⇒&nbsp; <br />
            </span>
            <Collapse
              activeKey={collapsedKeys}
              onChange={() => handleCollapse(key)}
              style={{
                marginTop: "5px",
                border: "1px dashed grey",
                transition: "none",
              }}
            >
              <Panel key={key} header="Expand/Collapse">
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                  }}
                >
                  {showObjectOwnPropertyNames
                    ? Object.getOwnPropertyNames(value)
                        .sort((a: any, b: any) =>
                          (typeof value[a]).toString() >
                          (typeof value[b]).toString()
                            ? -1
                            : 1
                        )
                        .map((key: any, subIndex: any) =>
                          renderItem(
                            [key, value[key]],
                            `${keyPrefix}.${subIndex}`,
                            depth + 1
                          )
                        )
                    : Object.keys(value)
                        .sort((a: any, b: any) =>
                          (typeof value[a]).toString() >
                          (typeof value[b]).toString()
                            ? -1
                            : 1
                        )
                        .map((key: any, subIndex: any) =>
                          renderItem(
                            [key, value[key]],
                            `${keyPrefix}.${subIndex}`,
                            depth + 1
                          )
                        )}
                </div>
              </Panel>
            </Collapse>
          </Card>
        );
      } else {
        return showEmptyObjects ? (
          <div key={`${keyPrefix}`} style={containerStyle}>
            <span>{key}</span>
            <span>{"{}"}</span>
          </div>
        ) : null;
      }
    } else {
      return showUndefinedOrNull ? (
        <div key={`${keyPrefix}`} style={containerStyle}>
          <span>
            <b>{key}</b>
          </span>
          <span>{"undefined or null"}</span>
        </div>
      ) : null;
    }
  };

  return (
    <AppContext.Provider
      value={{
        showEmptyObjects,
        setShowEmptyObjects,
        showUndefinedOrNull,
        setShowUndefinedOrNull,
        showFunctions,
        setShowFunctions,
        showObjectOwnPropertyNames,
        setShowObjectOwnPropertyNames,
      }}
    >
      {/*//@ts-ignore*/}
      <AppLayout>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            fontFamily: "Roboto Mono, monospace",
            marginTop: "20px",
          }}
        >
          {result.map((item: any, index: any) => renderItem(item, `${index}`))}
        </div>
      </AppLayout>
    </AppContext.Provider>
  );
}

export default App;
