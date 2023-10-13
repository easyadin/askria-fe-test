import { useMemo } from 'react';
import { useParams } from 'react-router';
import { useGetTemplates } from '../services/template/template.queries';
import { Breadcrumb, Flex, Layout } from 'antd';
import Title from 'antd/es/typography/Title';
import { useUpdateTemplate } from '../services/template/template.mutation';
import { HomeOutlined } from '@ant-design/icons';
import { ROUTES } from '../constants/routes';
import { Header } from 'antd/es/layout/layout';
import TemplateForm from '../components/Templates/TemplateForm';
import { ITemplate } from '../services/template/template.interface';

const Template = () => {
  const { id } = useParams<{
    id: string;
  }>();

  const { data, refetch } = useGetTemplates({});
  const { mutateAsync: updateTemplate } = useUpdateTemplate();

  const template = useMemo(() => {
    const res = data?.pages
      .flatMap((j) => j.data)
      .find((template) => template.id === id);

    return res;
  }, [data]);

  const onSaveTemplate = async (template: ITemplate) => {
    localStorage.setItem('persistedTemplate', JSON.stringify(template));
    await updateTemplate(template);
    refetch();
  };

  if (!template) {
    return <Title>Template not found</Title>;
  }

  return (
    <Layout style={{ paddingBottom: 20 }}>
      <Header style={{ padding: 10, backgroundColor: 'white' }}>
        <Flex justify='space-between' align='center' style={{ height: '100%' }}>
          <Breadcrumb
            items={[
              {
                href: ROUTES.LANDING,
                title: (
                  <>
                    <HomeOutlined />
                    <span>Templates</span>
                  </>
                ),
              },
              {
                title: (
                  <span style={{ fontWeight: 'bold' }}>Template Form</span>
                ),
              },
            ]}
          />
        </Flex>
      </Header>

      <Flex
        gap={20}
        style={{
          padding: 10,
          flexDirection: 'column',
          maxWidth: 600,
          margin: 'auto',
          width: '100%',
          paddingTop: 20,
        }}
      >
        <Layout>
          <Title
            style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              textAlign: 'center',
            }}
          >
            Edit Template
          </Title>
          <Title
            style={{
              padding: 0,
              margin: 0,
              fontSize: '.9rem',
              fontWeight: 'normal',
              textAlign: 'center',
              color: 'gray',
            }}
          >
            Changes are saved automatically excepts for questions.
          </Title>
        </Layout>
        <TemplateForm {...template} onTemplateChange={onSaveTemplate} />
      </Flex>
    </Layout>
  );
};

export default Template;
