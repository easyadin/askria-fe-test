import { Button, Flex, List, Select } from 'antd';
import {
  IQuestion,
  questionTypeLabelMaps,
  questionTypeList,
} from '../../services/template/template.interface';
import { CloseOutlined, EditOutlined } from '@ant-design/icons';
import { useMemo, useState } from 'react';
import ParagraphQuestion from './QuestionOptions/ParagraphQuestion';
import Title from 'antd/es/typography/Title';
import ChoiceQuestion from './QuestionOptions/ChoiceQuestion';
import YesNoQuestion from './QuestionOptions/YesNoQuestion';

type Props = IQuestion & {
  onSave: (question: IQuestion) => void;
  onDeleteQuestion: (id: string) => void;
  isEditInitialState?: boolean;
};

const filterOption = (
  input: string,
  option?: { label: string; value: string }
) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

const Question = ({
  onSave,
  onDeleteQuestion,
  isEditInitialState,
  ...rest
}: Props) => {
  const [isEdit, setEdit] = useState(isEditInitialState);
  const [question, setQuestion] = useState<IQuestion>(rest);

  const componentType = useMemo(() => {
    switch (question.type) {
      case 'Paragraph':
      case 'ShortAnswer':
        return (
          <ParagraphQuestion
            onChange={(question) =>
              setQuestion((state) => ({ ...state, question }))
            }
            value={question.question}
          />
        );

      case 'MultipleChoice':
      case 'Dropdown':
        return (
          <ChoiceQuestion
            onChange={(question) =>
              setQuestion((state) => ({ ...state, ...question }))
            }
            {...question}
          />
        );

      case 'YesNo':
        return (
          <YesNoQuestion
            onChange={(question) =>
              setQuestion((state) => ({ ...state, ...question }))
            }
            {...question}
          />
        );

      // case 'VideoQuestion':
      //   return (
      //     <VideoQuestion
      //       onChange={(question) =>
      //         setQuestion((state) => ({ ...state, ...question }))
      //       }
      //       {...question}
      //     />
      //   );
      default:
        return;
    }
  }, [question, isEdit]);

  return (
    <>
      {isEdit ? (
        <List.Item>
          <Flex style={{ flexDirection: 'column', width: '100%' }}>
            <Title style={{ fontSize: '1rem' }}>Type</Title>
            <Select
              size='large'
              defaultValue={question.type}
              showSearch
              placeholder='Select question type'
              optionFilterProp='children'
              filterOption={filterOption}
              options={[
                ...questionTypeList.map((q) => ({
                  value: q,
                  label: questionTypeLabelMaps[q],
                })),
              ]}
              onChange={(type) => setQuestion((state) => ({ ...state, type }))}
            />

            {componentType}

            {isEdit && (
              <Flex justify='space-between' style={{ paddingTop: 20 }}>
                <Button
                  size='small'
                  danger
                  icon={<CloseOutlined />}
                  onClick={() => onDeleteQuestion(question.id)}
                >
                  Delete question
                </Button>

                <Button
                  size='small'
                  type='primary'
                  onClick={() => {
                    onSave({ ...question, isEditInitialState: false } as any);
                    setEdit(false);
                  }}
                >
                  Save
                </Button>
              </Flex>
            )}
          </Flex>
        </List.Item>
      ) : (
        <List.Item
          actions={[
            <Button
              type='text'
              icon={<EditOutlined />}
              onClick={() => setEdit(true)}
            />,
          ]}
        >
          <List.Item.Meta
            title={
              <p
                style={{
                  fontSize: '.8rem',
                  color: 'gray',
                  fontWeight: 'lighter',
                  padding: 0,
                  margin: 0,
                }}
              >
                {questionTypeLabelMaps[question.type]}
              </p>
            }
            description={
              <p
                style={{
                  marginTop: -4,
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  color: 'black',
                }}
              >
                {question.question}
              </p>
            }
          />
        </List.Item>
      )}
    </>
  );
};

export default Question;
