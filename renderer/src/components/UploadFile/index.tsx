import React, { useState } from 'react';

// Import React FilePond
import { FilePond, registerPlugin } from 'react-filepond';
// Import FilePond styles
import 'filepond/dist/filepond.min.css';

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
// `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import { FilePondFile } from 'filepond';
import { Button, Icon, Label, Modal, Segment } from 'semantic-ui-react';
import PreviewFile from '../PreviewFile';

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const UploadFile = () => {
  const [files, setFiles] = useState<FilePondFile[] | any>([]);
  const [open, setOpen] = useState(false);

  const handleUpdateFiles = (files: FilePondFile[]) => {
    console.log(files[0].file);
    setFiles(files);
  };

  const handleClickFile = (file: FilePondFile) => {
    console.log(file);
    setOpen(true);
  };

  return (
    <div className="App">
      <FilePond
        files={files}
        onupdatefiles={handleUpdateFiles}
        allowMultiple={true}
        allowBrowse
        allowProcess
        allowRevert
        allowReplace
        allowReorder
        // @ts-ignore
        credits={false}
        onactivatefile={handleClickFile}
        maxFiles={3}
        name="files"
        labelIdle={`拖拖拽上传文件或者 
        <span class="filepond--label-action">浏览</span>
        <br> <span style="font-size: 12px;color: gray">点击文件预览</span>
        `}
      />
      <Modal dimmer={'blurring'} open={open} onClose={() => setOpen(false)}>
        <Modal.Header>
          <Segment color={'teal'}>
            <Icon name={'eye'} color={'teal'} />
            文件预览
            <Label as="a" color="teal" image style={{ marginLeft: 20 }}>
              index.html
              {/*<Label.Detail>HTML</Label.Detail>*/}
            </Label>
          </Segment>
        </Modal.Header>
        <Modal.Content>
          <PreviewFile />
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={() => setOpen(false)}>
            Disagree
          </Button>
          <Button positive onClick={() => setOpen(false)}>
            Agree
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default UploadFile;
