import { nanoid } from '@reduxjs/toolkit'
import React from 'react'
import styles from "./PhotoUploader.module.css"
import PhotoUploadInput from './PhotoUploadInput/PhotoUploadInput'
import PhotoUploadItem from './PhotoUploadItem'

type propsType = {
    onUpload?: (e:React.ChangeEvent<HTMLInputElement>) => void;
    files?: File[];
    indexOfMainPhoto: number;
    onMakeMain: (index: number) => void;
    onDelete: (id: number) => void;
    onOpen: (index: number) => void;
}

function PhotoUploaderForNewCard({ onUpload, files = [], indexOfMainPhoto, onMakeMain, onDelete, onOpen }: propsType) {

    return (
        <div className={styles.container}>
            {Array.isArray(files) && files.map((el, i) => <PhotoUploadItem 
                key={URL.createObjectURL(el)} 
                photo={URL.createObjectURL(el)} 
                isMain={i === indexOfMainPhoto} 
                type="New" 
                index={i} 
                id={i} 
                onMakeMain={onMakeMain}
                onDelete={onDelete}
                onOpen={onOpen}
            />)}
            {files.length <= 25 && <PhotoUploadInput onChange={onUpload} />}
        </div>
    )
}

export default React.memo(PhotoUploaderForNewCard)
