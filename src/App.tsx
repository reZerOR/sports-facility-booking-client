import MainLayout from "./layout/MainLayout";
import ProtectRoutes from "./routes/ProtectRoutes";

function App() {
  return (
    <>
      <ProtectRoutes>
        <MainLayout />
      </ProtectRoutes>
    </>
  );
}

export default App;
