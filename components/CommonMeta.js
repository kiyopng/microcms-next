import Head from 'next/head';
import { GA_TRACKING_ID } from '../libs/gtag';

export default function CommonMeta({ title, description, ogp }) {
    const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;
    
    return (
        <Head>
            <title>{title}</title>
            <meta property="description" content={description} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={`${SITE_URL}${ogp}`} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:image" content={`${SITE_URL}${ogp}`} />
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
            <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
            <link rel="manifest" href="/favicon/site.webmanifest" />
            <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#5bbad5" />
            <meta name="msapplication-TileColor" content="#da532c" />
            <meta name="theme-color" content="#ffffff" />
            <script>
                if (!crossOriginIsolated) SharedArrayBuffer = ArrayBuffer;
            </script>
            {/* Global Site Tag (gtag.js) - Google Analytics */}
            <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
            />
            <script
                dangerouslySetInnerHTML={{
                    __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_TRACKING_ID}', {
                    page_path: window.location.pathname,
                });
                `,
                }}
            />
        </Head>
    )
}