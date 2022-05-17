import pdfmake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts' // don't remove
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
      { text: `SKU: ${product.sku}`, style: 'header', margin: [25, 10, 0, 0] },
      { image: barcodeUri, width: 300, height: 80 },
      { text: product.barcode, margin: [100, 5, 0, 0] },
      // { text: `Nama Produk: ${product.name}`, margin: [0, 10, 0, 0] },
      // { image: product.imageUrl, fit: [200, 200] },
      // `Kategori: ${product?.category?.name}`,
      // `Deskripsi: ${product.description || '-'}`,
      // {
      //   text: `Satuan: ${product?.measureUnit?.name}`,
      //   margin: [0, 10, 0, 0],
      // },
      // `Stock: ${product.stock}`,
      // `Terjual: ${product.sold}`,
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

export const generateDeliveryOrder = async transaction => {
  // const barcodeUri = await CodeGenerator.generate({
  //   type: CodeGenerator.Type.Code128,
  //   code: `${transaction.barcode}`,
  // })
  // console.log({ 'CodeGenerator.barcodeUri': barcodeUri })

  const { products, contact } = transaction

  // let totalItem = 0
  // let totalPrice = 0
  const productDocs = products.map((p, index) => ({
    columns: [
      {
        width: 20,
        text: `${index + 1}`,
      },
      {
        width: 120,
        text: `${p.sku}`,
      },
      {
        width: '*',
        text: `${p.name} uk.${p.size}`,
      },
      {
        width: 'auto',
        text: `${p.amount} PCS`,
      },
    ],
    columnGap: 10,
  }))

  const docDefinition = {
    content: [
      { text: `SURAT JALAN`, style: 'header' },
      { text: `PT. KREASINDO MITRA PRIMA`, style: 'header' },
      { text: `JL. JALUR SUTERA TIMUR 3B NO 7` },

      // { image: barcodeUri, width: 300, height: 80 },
      { text: `Kode Invoice: ${transaction.invoiceCode}` },
      { text: `Tanggal: ${transaction.createdAt}` },
      { text: contact ? `Pelanggan: ${contact.name}` : '' },
      { text: `PPN: ${transaction.tax || 'Non'}` },

      // { text: `Nama Produk: ${transaction.name}`, margin: [0, 10, 0, 0] },
      {
        columns: [
          {
            width: 20,
            text: `No`,
            style: 'colHeader',
          },
          {
            width: 120,
            text: `SKU`,
            style: 'colHeader',
          },
          {
            width: '*',
            text: `Nama Barang`,
            style: 'colHeader',
          },
          {
            width: 'auto',
            text: `Jumlah`,
            style: 'colHeader',
          },
        ],
        columnGap: 10,
        margin: [0, 10, 0, 0],
      },
      ...productDocs,
      {
        columns: [
          {
            width: '*',
            text: ``,
          },
          {
            width: 'auto',
            text: `Total`,
          },
          {
            width: 'auto',
            text: `${transaction.totalItem} PCS`,
          },
        ],
        columnGap: 10,
      },

      { text: `Keterangan: ${transaction.note || '-'}`, margin: [0, 10, 0, 0] },
    ],

    styles: {
      header: {
        fontSize: 22,
        bold: true,
      },
      colHeader: {
        fontSize: 14,
        bold: true,
      },
    },
  }

  const pdfDocGenerator = pdfmake.createPdf(docDefinition)
  pdfDocGenerator.getBase64(base64Data => {
    Toast.show({ description: i18n.t('downloadSuccess') })
    savePdf(
      base64Data,
      `${transaction.invoiceCode} - ${moment().format('DD MMM YYYY HH.mm')}`,
    )
  })
}

const savePdf = async (pdfData, filename) => {
  const { fs } = RNFetchBlob

  const dPath = Platform.select({
    ios: fs.dirs.DocumentDir,
    android: fs.dirs.DownloadDir,
  })

  fPath = `${dPath}/${String(filename).replace(/[/\\]/g, '-')}.pdf`

  if (Platform.OS === 'ios') {
    await fs.createFile(fPath, pdfData, 'base64')
    RNFetchBlob.ios.previewDocument(fPath)
  } else {
    await fs.writeFile(fPath, pdfData, 'base64')
  }
}
