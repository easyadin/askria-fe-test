import { useNavigate } from 'react-router-dom';
import { ErrorComponentProps } from '../../lib/HOCs/withErrorBoundary';
import { Button, Space } from 'antd';
import Title from 'antd/es/typography/Title';

const NotFoundView = ({ resetErrorBoundary, props }: ErrorComponentProps) => {
  const navigate = useNavigate();
  return (
    <div {...props}>
      <Title>Oops, Content could not be found 😣</Title>
      <Space wrap>
        <Button onClick={resetErrorBoundary}>Try again</Button>
        <Button onClick={() => navigate('/')}>Go back</Button>
      </Space>
    </div>
  );
};

export default NotFoundView;
