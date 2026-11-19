import Documents from '../../blocks/saas/Documents.jsx';
import source from '../../blocks/saas/Documents.jsx?raw';
import { desktop, blockParams } from './frame.jsx';

export default {
  title: 'Blocks/SaaS/Business documents',
  component: Documents,
  decorators: [desktop],
  parameters: { ...blockParams(source, 'Upload business documents: progress and the deadline, one panel per document with file upload (uploaded, uploading with progress, not accepted), the ID type as radio buttons, notes for the reviewer and submit. The rules (types and size) are in the hint before people choose a file.'), layout: 'fullscreen' },
};
export const Default = { name: 'In progress' };
export const Errors = { name: 'With errors', args: { errors: true } };
