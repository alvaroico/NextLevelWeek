import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import { FiUpload } from 'react-icons/fi';


import './styles.css'

interface Props {
  onFileUploaded: (file: File) => void;
}


const  Dropzone: React.FC<Props> = ({ onFileUploaded }) => {
    const [selectedFileUrl, setselectedFileUrl] = useState('')
  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0];

    const fileUrl = URL.createObjectURL(file);

    setselectedFileUrl(fileUrl);
    onFileUploaded(file);
}, [onFileUploaded])


  const {getRootProps, getInputProps/*, isDragActive*/} = useDropzone({
      onDrop,
      accept: 'image/*'
    
    })

  return (
    <div className="dropzone" {...getRootProps()}>
      <input {...getInputProps()} /*multiple*/ accept="image/*" />
      {
        selectedFileUrl
          ? <img src={selectedFileUrl} alt="Ponto para envio" />
          : (
            <p><FiUpload />Arraste e solte alguns arquivos aqui ou clique para selecionar os arquivos</p>
          )

      
      /*
        isDragActive ?
          <p>Solte os arquivos aqui ...</p> :
          <p><FiUpload />Arraste e solte alguns arquivos aqui ou clique para selecionar os arquivos</p>
        */
      }
    </div>
  )
}

export default Dropzone;