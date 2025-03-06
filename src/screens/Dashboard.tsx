import Board from "../components/Board";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

interface DashboardProps {}
const Dashboard: React.FC<DashboardProps> = ({}) => {
  return (
    <div className="h-screen w-full flex flex-col bg-gradient-to-r from-indigo-500 to-purple-500">
      <Navbar />
      <Board />
      <Footer />
    </div>
  );
};
export default Dashboard;
