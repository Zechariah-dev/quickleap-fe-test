import { useLocation } from "react-router-dom";

export default function SuccessPage() {
  const { state } = useLocation();

  return (
    <div className="container center" style={{ flexDirection: "column" }}>
      <h1>Success</h1>
      <p>{state.name} congrate your card was saved</p>
    </div>
  );
}
