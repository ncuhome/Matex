import React from 'react';

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
import { useUpdateBinary } from '/@/store/apiTestStore';

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const UploadFile = () => {
  const { files, deleteBinary, addBinary } = useUpdateBinary();

  const filePond = files.map((item) => {
    return item.file;
  });

  return (
    <div className="App">
      <FilePond
        files={filePond}
        onaddfile={(_, file) => {
          addBinary(file);
        }}
        onremovefile={(_, file) => {
          deleteBinary(file.id);
        }}
        allowMultiple={true}
        allowBrowse
        allowProcess
        allowRevert
        allowReplace
        allowReorder
        // @ts-ignore
        credits={false}
        // onactivatefile={handleClickFile}
        maxFiles={3}
        name="files"
        labelIdle={`拖拖拽上传文件或者 
        <span class="filepond--label-action">浏览</span>
        <br> <span style="font-size: 12px;color: gray">点击文件预览</span>
        `}
      />
    </div>
  );
};

export default UploadFile;
