import { Card, Image, Skeleton } from 'antd';
import Meta from 'antd/es/card/Meta';
import { Link } from 'react-router-dom';
import { EditOutlined } from '@ant-design/icons';
import { ITemplate } from '../../services/template/template.interface';
import { ROUTES } from '../../constants/routes';

const TemplateListItem = (template: ITemplate & { loading: boolean }) => {
  return (
    <Link
      to={`${ROUTES.TEMPLATES}/${template.id}`}
      style={{ width: '100%', overflow: 'hidden' }}
    >
      <Card
        style={{ overflow: 'hidden' }}
        loading={template.loading}
        hoverable
        cover={
          <>
            {template.loading && (
              <Skeleton.Image
                active={true}
                style={{ maxHeight: 200, objectFit: 'cover' }}
                className='template-skeleton-image'
              />
            )}
            {!template.loading && (
              <Image
                alt={template.attributes.coverImage}
                src={template.attributes.coverImage}
                preview={false}
                style={{ maxHeight: 200, objectFit: 'cover' }}
              />
            )}
          </>
        }
        actions={[<EditOutlined key='edit' />]}
      >
        <Meta title={template.id} description={template.type} />
      </Card>
    </Link>
  );
};

export default TemplateListItem;
