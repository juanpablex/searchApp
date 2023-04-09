import PDFLib, { PDFDocument, PDFPage } from 'react-native-pdf-lib';


//const PdfReports = () => {
const page1 = PDFPage
    .create()
    .setMediaBox(200, 200)
    .drawText('You can text', {
        x: 5,
        y: 235,
        color: '#007386'
    })
    .drawRectangle({
        x: 25,
        y: 235,
        width: 150,
        height: 150,
        color: '#FF99CC',
    })
    .drawRectangle({
        x: 75,
        y: 75,
        width: 50,
        height: 50,
        color: '#99FFCC',
    });
const docsDir = PDFLib.getDocumentsDirectory();
const pdfPath = `${docsDir}/sample.pdf`;
//const pdfPath = './data/ex.pdf';
PDFDocument
    .create(pdfPath)
    .addPages(page1)
    .write()
    .then(path => {
        console.log('PDF created at: ', path);
    });



//}

//export default PdfReports;



