import { useNavigate } from 'react-router-dom';
import { ErrorComponentProps } from '../../lib/HOCs/withErrorBoundary';
import { Button, Space } from 'antd';

const NotFoundView = ({ resetErrorBoundary, props }: ErrorComponentProps) => {
  const navigate = useNavigate();
  return (
    <div {...props}>
      <p>Oops, Content could not be found 😣</p>
      <Space wrap>
        <Button onClick={resetErrorBoundary}>Try again</Button>
        <Button onClick={() => navigate('/')}>Go back</Button>
      </Space>
    </div>
  );
};

export default NotFoundView;
