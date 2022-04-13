import { nanoid } from '@reduxjs/toolkit'
import React from 'react'
import { photoType } from 'types/photoTypes'
import styles from "./PhotoUploader.module.css"
import PhotoUploadInput from './PhotoUploadInput/PhotoUploadInput'
import PhotoUploadItem from './PhotoUploadItem'

type propsType = {
    onUpload?: (e:React.ChangeEvent<HTMLInputElement>) => void;
    photos?: photoType[];
    onMakeMain?: (id: number) => void;
    onDelete?: (id: number) => void;
    onOpen?: (index: number) => void;
    isLoading?: boolean
}

function PhotoUploader({ onUpload, photos = [], onMakeMain, onDelete, onOpen, isLoading }: propsType) {
    const [tempFiles, setTempFiles] = React.useState<File[]>([])

    const uploadHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
        onUpload && onUpload(e);
        const newFiles = Array.from(e.target.files as FileList);
        setTempFiles(newFiles)
    }

    React.useEffect(() => {
        !isLoading && setTempFiles([])
    }, [photos])

    return (
        <div className={styles.container}>
            {Array.isArray(photos) && photos.map((el, i) => <PhotoUploadItem 
                key={el.id} 
                photo={el.image_sm} 
                isMain={el.is_main}  
                index={i} 
                id={el.id} 
                onMakeMain={onMakeMain}
                onDelete={onDelete}
                onOpen={onOpen}
                type="Existing"
            />)}
            {isLoading && tempFiles.map((el, i) => <PhotoUploadItem 
                key={URL.createObjectURL(el)} 
                photo={URL.createObjectURL(el)} 
                isMain={false}  
                index={i} 
                id={i} 
                type="Loading"
            />)}
            {photos.length <= 25 && !isLoading && <PhotoUploadInput onChange={uploadHandler} />}
        </div>
    )
}

export default PhotoUploader
