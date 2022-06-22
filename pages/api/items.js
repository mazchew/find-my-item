export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { image, title, description, location, category } = req.body;

        const item = await prisma.item.create({
            data: { image, title, description, location, category },
        });

        res.status(200).json(item);
    }

    else {
        res.setHeader('Allow', ['POST']);
        res.status(405).json({ message: `HTTP method not supported.` });
    }
}