import fetch from "node-fetch";

export default async (req, res) => {
    if (!req.query.slug) {
        return res.status(404).end();
    }
    const content = await fetch(
        `https://shopifydesign.microcms.io/api/v1/blog/${req.query.slug}?fields=id&draftKey=${req.query.draftKey}`,
        { headers: { 'X-MICROCMS-API-KEY': process.env.API_KEY || '' } }
    )
        .then(res => res.json()).catch(error => null);
    res.setPreviewData({
        slug: content.id,
        draftKey: req.query.draftKey,
    });
    res.writeHead(307, { Location: `/${content.id}` });
    res.end('Preview mode enabled');
};