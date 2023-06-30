import { Checkbox, Layout } from "antd";
import React, { useContext } from "react";
import { AppContext } from "./App";

const { Header, Content } = Layout;

const AppLayout: React.FC = (props: any) => {
  const {
    showEmptyObjects,
    setShowEmptyObjects,
    showUndefinedOrNull,
    setShowUndefinedOrNull,
    showFunctions,
    setShowFunctions,
    showObjectOwnPropertyNames,
    setShowObjectOwnPropertyNames,
  } = useContext(AppContext);

  return (
    <Layout style={{ margin: "-8px", minHeight: "100vh" }}>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          color: "white",
        }}
      >
        <h1 style={{ color: "white" }}>Window Object Explorer</h1>

        <div>
          <Checkbox
            checked={showFunctions}
            onChange={() => setShowFunctions(!showFunctions)}
            style={{ color: "white" }}
          >
            Functions
          </Checkbox>
        </div>
        <div style={{ color: "white" }}>|</div>
        <div>
          <Checkbox
            checked={showEmptyObjects}
            onChange={() => setShowEmptyObjects(!showEmptyObjects)}
            style={{ color: "white" }}
          >
            Empty Objects
          </Checkbox>
        </div>
        <div style={{ color: "white" }}>|</div>
        <div>
          <Checkbox
            checked={showUndefinedOrNull}
            onChange={() => setShowUndefinedOrNull(!showUndefinedOrNull)}
            style={{ color: "white" }}
          >
            Undefined/Null
          </Checkbox>
        </div>
        <div style={{ color: "white" }}>|</div>
        <div>
          <Checkbox
            checked={showObjectOwnPropertyNames}
            onChange={() =>
              setShowObjectOwnPropertyNames(!showObjectOwnPropertyNames)
            }
            style={{ color: "white" }}
          >
            Own Properties
          </Checkbox>
        </div>

        <a href="https://chita.dev" style={{ textDecoration: "underline" }}>
          <h3 style={{ color: "white" }}>chita.dev</h3>
        </a>
      </Header>
      <Layout>
        <Layout
          style={{
            padding: "0 24px 24px",
            backgroundImage:
              "linear-gradient(to right top, #eaf7ff, #d1d3ec, #e2e1ee, #f0f0f0)",
          }}
        >
          <Content>{props.children}</Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
