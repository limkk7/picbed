import {Link} from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <nav>
      <Link to="/">首页</Link>
      <Link to="/history">上传历史</Link>
      <Link to="/about">关于</Link>
    </nav>
  );
};

export {Header};
