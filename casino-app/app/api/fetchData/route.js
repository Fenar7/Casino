import { connectToDB } from '@/utils/database';
import Data from '@/models/datatable';

export default async function handler(req, res) {
    try {
        await connectToDB();

        // Adjust the date to reflect the local timezone
        const currentDate = new Date();
        const offset = currentDate.getTimezoneOffset();
        currentDate.setMinutes(currentDate.getMinutes() - offset);
        const localDate = currentDate.toISOString().split('T')[0]; // Get only the date in 'YYYY-MM-DD' format

        // Find the document with the current date
        const oldData = await Data.findOne({ date: localDate });

        if (oldData) {
            console.log(oldData);
            return new Response(JSON.stringify(oldData), {
                status: 200,
            });
        } else {
            return new Response("No data found for today's date", {
                status: 404,
            });
        }

    } catch (error) {
        console.log(error.message);
        return new Response("Failed to fetch Data", { status: 500 });
    }
}

export const GET = handler;
