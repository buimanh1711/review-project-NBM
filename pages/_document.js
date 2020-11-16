import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {


    render() {
        return (
            <Html>
                <Head>
                    <script src="https://kit.fontawesome.com/cc8d84a666.js" crossorigin="anonymous"></script>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument;