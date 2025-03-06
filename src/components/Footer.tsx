interface FooterProps {}
const Footer: React.FC<FooterProps> = ({}) => {
  return <footer className="shadow-md p-2 flex justify-center items-center bg-gradient-to-r from-indigo-700 to-purple-700">
    <div className="text-sm text-white">Developed by Mudassir Khan</div>
  </footer>;
};
export default Footer;
