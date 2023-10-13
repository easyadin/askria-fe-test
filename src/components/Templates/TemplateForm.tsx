import { Flex } from 'antd';
import { ITemplate } from '../../services/template/template.interface';
import CoverImage from './TemplateCards/CoverImage';
import PersonalInformation from './TemplateCards/PersonalInformation';
import Profile from './TemplateCards/Profile';
import AdditionalInformation from './TemplateCards/AdditionalInformation';

type Props = ITemplate & { onTemplateChange: (template: ITemplate) => void };
const TemplateForm = ({ onTemplateChange, ...template }: Props) => {
  const onSaveCoverImage = async (uris: string[]) => {
    const mutated = {
      ...template,
      attributes: {
        ...template.attributes,
        coverImage: uris[0],
      },
    };

    onTemplateChange(mutated);
  };

  return (
    <Flex
      gap={20}
      style={{
        flexDirection: 'column',
      }}
    >
      <CoverImage
        onImageUploaded={onSaveCoverImage}
        initialImage={template?.attributes.coverImage}
      />

      <PersonalInformation
        {...template?.attributes.personalInformation}
        onChange={(pi) =>
          onTemplateChange({
            ...template,
            attributes: { ...template.attributes, personalInformation: pi },
          })
        }
      />

      <Profile
        {...template?.attributes.profile}
        onChange={(pi) =>
          onTemplateChange({
            ...template,
            attributes: { ...template.attributes, profile: pi },
          })
        }
      />
      <AdditionalInformation
        onChange={(questions) =>
          onTemplateChange({
            ...template,
            attributes: {
              ...template.attributes,
              customisedQuestions: questions,
            },
          })
        }
        questions={template.attributes.customisedQuestions}
      />
    </Flex>
  );
};

export default TemplateForm;
