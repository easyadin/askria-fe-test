import { Button, Layout, List } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import { IQuestion } from '../../services/template/template.interface';
import { PlusOutlined } from '@ant-design/icons';
import { useMemo } from 'react';
import Question from './Question';

type TQuestionWithEditStatus = IQuestion & {
  isEditInitialState?: boolean;
};

interface Props {
  onChange: (questions: TQuestionWithEditStatus[]) => void;
  questions: TQuestionWithEditStatus[];
}

const Questions = ({ onChange, questions }: Props) => {
  const addQuestion = () => {
    onChange([
      ...questions,
      {
        id: uuidv4(),
        type: 'Paragraph',
        disqualify: false,
        question: '',
        other: false,
        isEditInitialState: true,
      },
    ]);
  };

  const onQuestionChanged = (updatedQuestion: TQuestionWithEditStatus) => {
    const questionIndex = questions.findIndex(
      (q) => q.id === updatedQuestion.id
    );

    if (questionIndex !== -1) {
      questions[questionIndex] = updatedQuestion;
    }

    onChange([...questions]);
  };

  const questionList = useMemo(() => {
    return questions;
  }, [questions]);

  const onDeleteQuestion = (questionId: string) => {
    const updatedQuestions = questions.filter((q) => q.id !== questionId);
    onChange(updatedQuestions);
  };

  return (
    <>
      <Layout style={{ background: 'white', width: '100%' }}>
        {questionList.length > 0 && (
          <List
            itemLayout='horizontal'
            dataSource={questionList}
            rowKey={(item) => item.id}
            renderItem={(item) => (
              <Question
                {...item}
                onSave={(question) =>
                  onQuestionChanged({ ...item, ...question })
                }
                onDeleteQuestion={onDeleteQuestion}
                isEditInitialState={item.isEditInitialState}
              />
            )}
          ></List>
        )}
      </Layout>
      <Button
        style={{
          backgroundColor: 'white',
          marginTop: questionList.length > 0 ? 30 : 20,
        }}
        icon={<PlusOutlined />}
        onClick={addQuestion}
      >
        Add a question
      </Button>
    </>
  );
};

export default Questions;
