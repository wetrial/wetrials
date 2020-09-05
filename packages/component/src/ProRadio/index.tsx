import { RadioProps } from 'antd/es/radio';
import InternalRadio from './radio';
import Group from './group';
import Button from './radioButton';

interface CompoundedComponent
  extends React.ForwardRefExoticComponent<RadioProps & React.RefAttributes<HTMLElement>> {
  Group: typeof Group;
  Button: typeof Button;
}

const Radio = InternalRadio as CompoundedComponent;
Radio.Button = Button;
Radio.Group = Group;
export { Button, Group };
export default Radio;
