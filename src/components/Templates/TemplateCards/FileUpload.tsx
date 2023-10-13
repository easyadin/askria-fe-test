import { useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { message, Upload } from 'antd';

const { Dragger } = Upload;

interface Props {
  acceptedTypes: string[];
  multiple: boolean;
  onImageUploaded: (uris: string[]) => void;
  maxFileSize: number;
  title: string;
  subTitle: String;
  maxCount: number;
}

const FileUploader = ({
  acceptedTypes,
  multiple,
  onImageUploaded,
  maxFileSize,
  title,
  subTitle,
  maxCount,
}: Props) => {
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const uploaderProps: UploadProps = {
    name: 'image',
    multiple,
    maxCount,
    beforeUpload: (file) => {
      const isAcceptedFileType = acceptedTypes.includes(file.type);
      if (!isAcceptedFileType) {
        message.error(
          `${file.name} is not a valid ${acceptedTypes.toString()} type`
        );
        return false;
      }

      // Check if the file size exceeds the maximum allowed size
      if (file.size > maxFileSize) {
        message.error(
          `${file.name} exceeds the maximum allowed size of ${
            maxFileSize / 1024 / 1024
          }MB`
        );
        return false;
      }

      // Convert the image to Base64
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        const base64Data = reader.result as string;
        setUploadedImages((prevImages) => [...prevImages, base64Data]);
        onImageUploaded([...uploadedImages, base64Data]);
      };
      reader.onerror = function (error) {
        console.log('Error converting image to Base64:', error);
      };
      return false;
    },
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
    accept: acceptedTypes.toString(),
  };

  return (
    <div>
      <Dragger {...uploaderProps} style={{ padding: 10 }}>
        <p className='ant-upload-drag-icon'>
          <UploadOutlined />
        </p>
        <p className='ant-upload-text'>{title}</p>
        <p className='ant-upload-hint'>{subTitle}</p>
      </Dragger>
    </div>
  );
};

export default FileUploader;
