import { Button, Card, Layout } from 'antd';
import FileUploader from './FileUpload';
import colors from '../../../constants/colors';
import { acceptedImageTypes } from '../../../constants/images';
import { fileSizeLimit } from '../../../constants/files';
import { CloseOutlined } from '@ant-design/icons';
import CardWrapper from './CardWrapper';

interface Props {
  onImageUploaded: (uris: string[]) => void;
  initialImage: string | undefined;
}

const CoverImage = ({ onImageUploaded, initialImage }: Props) => {
  return (
    <Layout>
      {initialImage ? (
        <Card
          hoverable
          cover={
            <img
              alt=''
              src={initialImage}
              style={{ maxHeight: 300, objectFit: 'cover' }}
            />
          }
          actions={[
            <Button
              type='link'
              danger
              icon={<CloseOutlined />}
              onClick={() => onImageUploaded([])}
            >
              Delete & re-upload
            </Button>,
          ]}
          bodyStyle={{ display: 'none' }}
          style={{ overflow: 'hidden', textAlign: 'left' }}
          className='cover-image-card'
        ></Card>
      ) : (
        <CardWrapper
          hoverable
          cardTitle='Upload cover image'
          headStyle={{ background: colors.primary }}
        >
          <FileUploader
            acceptedTypes={acceptedImageTypes}
            multiple={false}
            onImageUploaded={onImageUploaded}
            maxFileSize={fileSizeLimit['1mb']}
            title={'Upload cover image'}
            subTitle={`16:9 ratio is recommended. Max image size 1MB`}
            maxCount={1}
          />
        </CardWrapper>
      )}
    </Layout>
  );
};

export default CoverImage;
