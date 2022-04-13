export const uploadPhotosFormDataBuilder = (files: File[], indexOfMainPhoto?: number) => {
    const formData = new FormData()
    files.forEach((el, i) => {
        if (i === indexOfMainPhoto) {
            formData.append("main_photo", el) 
        } else {
            formData.append("photo", el)
        }
    })
    return formData
}