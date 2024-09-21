import { useData } from "hooks/useData";

function App() {
  const {
    data,
    setData,
    message,
    updateData,
    verifyData,
    recoverData,
    tamperData,
  } = useData();

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        position: "absolute",
        padding: 0,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "20px",
        fontSize: "30px",
      }}
    >
      <div>Saved Data</div>
      <input
        style={{ fontSize: "30px" }}
        type="text"
        value={data}
        onChange={(e) => setData(e.target.value)}
      />

      <div style={{ display: "flex", gap: "10px" }}>
        <button style={{ fontSize: "20px" }} onClick={updateData}>
          Update Data
        </button>
        <button style={{ fontSize: "20px" }} onClick={verifyData}>
          Verify Data
        </button>
        <button style={{ fontSize: "20px" }} onClick={recoverData}>
          Recover Data
        </button>
        <button style={{ fontSize: "20px" }} onClick={tamperData}>
          Tamper Data
        </button>
      </div>
      {message && <div style={{ fontSize: "20px" }}>{message}</div>}
    </div>
  );
}

export default App;
