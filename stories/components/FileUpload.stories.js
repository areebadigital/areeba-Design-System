import { A, h, doc } from '../areeba.js';
import readme from '../../components/FileUpload/README.md?raw';

export default {
  title: 'Components/Inputs/FileUpload',
  component: A.FileUpload,
  parameters: doc(readme),
  args: { label: 'Commercial register', hint: 'PDF, JPG or PNG, up to 10 MB', accept: '.pdf,.jpg,.png', maxSize: 10485760 },
  argTypes: {
    accept: { control: 'text', description: 'File types: extensions or MIME types.' }, maxSize: { control: 'number', description: 'Bytes.' },
    multiple: { control: 'boolean' }, error: { control: 'text' }, hint: { control: 'text' }, disabled: { control: 'boolean' },
    onChange: { action: 'changed', description: '`(files)`' },
  },
  render: (args) => h('div', { style: { maxWidth: 460 } }, h(A.FileUpload, args)),
};

export const Playground = {};
export const States = {
  args: { multiple: true, label: 'Supporting documents', defaultFiles: [
    { name: 'commercial-register.pdf', size: 1258291, status: 'done' },
    { name: 'id-front.jpg', size: 845000, status: 'uploading', progress: 60 },
    { name: 'bank-letter.heic', size: 3100000, status: 'error', error: 'This file type is not accepted.' },
  ] },
};
export const WithError = { name: 'With error', args: { error: 'Upload your commercial register to continue.' } };
