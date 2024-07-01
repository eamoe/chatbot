import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";

const AppLayout = ({children}) => {
  return (
    <div className="container bg-info">
        <AppHeader />
            <div className="row">{children}</div>
        <AppFooter/>
    </div>
  )
}
export default AppLayout
