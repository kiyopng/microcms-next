import Head from 'next/head';
import { GA_TRACKING_ID } from '../libs/gtag'

export default function CommonMeta({ title, description }) {
    return (
        <Head>
            <title>{title}</title>
            <meta property="description" content={description} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={`${process.env.SITE_URL}/ogp_large.png`} />
            <meta name="twitter:card" content="summary_large_image" />
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
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