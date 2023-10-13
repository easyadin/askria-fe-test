import { IPersonalInformationConstraints } from '../../services/template/template.interface';

type Props = IPersonalInformationConstraints & {
  onChange: (change: IPersonalInformationConstraints) => void;
};
const PersonalInformationItem = ({}: Props) => {
  return <div>PersonalInformation</div>;
};

export default PersonalInformationItem;
