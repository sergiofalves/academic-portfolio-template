import fs from 'fs'
import path from 'path'

export async function GET(request) {
    const { searchParams } = new URL(request.nextUrl);
    const filename = searchParams.get('filename');
    const availableFileTypes = ["aboutme", "projects", "publications", "software"];


    if (!filename) {
        return Response.json({ error: "Filename parameter is required" }, { status: 400 })
    }

    if (!availableFileTypes.includes(filename)) {
        return Response.json({ error: "Invalid filename" }, { status: 400 });
    }

    const filePath = path.join(process.cwd(), 'data', `${filename}.json`);

    try {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        return Response.json(JSON.parse(fileContent))
    } catch (error) {
        return Response.json({ error: "File not found" }, { status: 400 })
    }
}