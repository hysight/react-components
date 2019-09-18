/**
 *@Author: hy-zhangb
 *Date: 2018/7/10 18:04
 *@Last Modified by: hy-zhangb
 *@Last Modified time: 2018/7/10 18:04
 *Email: lovewinders@163.com
 *File Path: data - attr-accept
 *@File Name: attr-accept
 *@Description: Description
 */
function endsWith(str, suffix) {

    return str.indexOf(suffix, str.length - suffix.length) !== -1;

}

export default (file, acceptedFiles) => {

    if(file && acceptedFiles) {

        const acceptedFilesArray = Array.isArray(acceptedFiles)
            ? acceptedFiles
            : acceptedFiles.split(',');
        const fileName = file.name || '';
        const mimeType = file.type || '';
        const baseMimeType = mimeType.replace(/\/.*$/, '');

        return acceptedFilesArray.some(type => {

            const validType = type.trim();
            if(validType.charAt(0) === '.') {

                return endsWith(fileName.toLowerCase(), validType.toLowerCase());

            } else if(/\/\*$/.test(validType)) {

                // This is something like a image/* mime type
                return baseMimeType === validType.replace(/\/.*$/, '');

            }
            return mimeType === validType;

        });

    }
    return true;

};
