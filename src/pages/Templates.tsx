import { Button, Col, Flex, Layout, Row } from 'antd';
import { Header, Content } from 'antd/es/layout/layout';
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import Title from 'antd/es/typography/Title';
import { useGetTemplates } from '../services/template/template.queries';
import { useMemo } from 'react';
import TemplateListItem from '../components/Templates/TemplateListItem';

const Templates = () => {
  const { data, isLoading } = useGetTemplates({});

  const templates = useMemo(() => {
    return data?.pages.flatMap((j) => j.data);
  }, [data]);

  return (
    <Layout>
      <Header style={{ padding: 10, backgroundColor: 'white' }}>
        <Flex justify='space-between' align='center' style={{ height: '100%' }}>
          <Title style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
            Templates
          </Title>
          <Button size='large' type='primary' icon={<PlusOutlined />}>
            Create Template
          </Button>
        </Flex>
      </Header>
      <Content style={{ padding: 10 }}>
        <Row gutter={[16, 16]}>
          {templates?.map((app, i) => (
            <Col md={8} lg={6} xl={4} key={i} style={{ width: '100%' }}>
              <TemplateListItem {...app} loading={isLoading} />
            </Col>
          ))}
        </Row>
      </Content>
    </Layout>
  );
};

export default Templates;
