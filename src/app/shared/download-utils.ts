export default class DownloadUtils {
  static baixarDocumentoBase64(conteudo: any, nomeArquivo: any, mymeType: any) {
    const blob = DownloadUtils.b64toBlob(conteudo, mymeType);
    const blobUrl = URL.createObjectURL(blob);

    const downloadLink = document.createElement('a');
    downloadLink.href = blobUrl;
    downloadLink.download = nomeArquivo;
    downloadLink.click();
    downloadLink.remove();
  }

  static b64toBlob(b64Data: any, contentType: any) {
    const sliceSize = 512;
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i += 1) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: contentType });
  }
}
