import pdfmake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
import CodeGenerator from 'react-native-smart-code'
import RNFetchBlob from 'rn-fetch-blob'
import { Toast } from 'native-base'
import moment from 'moment'

import i18n from '@/Translations'

export const generatePdfProduct = async product => {
  const barcodeUri = await CodeGenerator.generate({
    type: CodeGenerator.Type.Code128,
    code: `${product.barcode}`,
  })
  console.log({ 'CodeGenerator.barcodeUri': barcodeUri })

  // new Promise(resolve => {
  const docDefinition = {
    content: [
      { text: `SKU: ${product.sku}`, style: 'header' },
      { image: barcodeUri, width: 300, height: 80 },
      { text: `Nama Produk: ${product.name}`, margin: [0, 10, 0, 0] },
      // { image: product.imageUrl, fit: [200, 200] },
      `Kategori: ${product?.category?.name}`,
      `Deskripsi: ${product.description}`,
      {
        text: `Satuan: ${product?.measureUnit?.name}`,
        margin: [0, 10, 0, 0],
      },
      `Stock: ${product.stock}`,
      `Terjual: ${product.totalSold}`,
    ],

    styles: {
      header: {
        fontSize: 22,
        bold: true,
      },
    },
  }

  const pdfDocGenerator = pdfmake.createPdf(docDefinition)
  pdfDocGenerator.getBase64(base64Data => {
    Toast.show({ description: i18n.t('downloadSuccess') })
    savePdf(
      base64Data,
      `${product.sku} - ${moment().format('DD MMM YYYY HH.mm')}`,
    )

    // resolve({
    //   pdfData: `data:application/pdf;base64,${base64Data}`,
    // })
  })
  // })
}

const savePdf = async (pdfData, filename) => {
  const { fs } = RNFetchBlob

  const dPath = Platform.select({
    ios: fs.dirs.DocumentDir,
    android: fs.dirs.DownloadDir,
  })

  fPath = `${dPath}/${filename}.pdf`

  if (Platform.OS === 'ios') {
    await fs.createFile(fPath, pdfData, 'base64')
    RNFetchBlob.ios.previewDocument(fPath)
  } else {
    await fs.writeFile(fPath, pdfData, 'base64')
  }
}
