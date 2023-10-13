import { Card, CardProps } from 'antd';
import Title from 'antd/es/typography/Title';
import colors from '../../../constants/colors';

const CardWrapper = ({
  cardTitle,
  children,
  ...rest
}: CardProps & { cardTitle?: string }) => {
  return (
    <Card
      hoverable
      title={
        <Title style={{ fontSize: '1rem', color: 'white' }}>{cardTitle}</Title>
      }
      headStyle={{ background: colors.primary }}
      {...rest}
    >
      {children}
    </Card>
  );
};

export default CardWrapper;
