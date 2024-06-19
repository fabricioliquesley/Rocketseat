import { Outlet } from "react-router-dom";
import { Header } from "../../components/Header";
import { LayoutContent } from "./styles";

export function DefaultLayout() {
  return (
    <LayoutContent>
      <Header />
      <Outlet />
    </LayoutContent>
  );
}
