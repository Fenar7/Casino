import { connectToDB } from '@/utils/database';
import Data from '@/models/datatable';

export default async function handler(req, res) {
    try {
        await connectToDB();

        // Fetch the current date and time from World Time API for Asia/Kolkata
        const response = await fetch('http://worldtimeapi.org/api/timezone/Asia/Kolkata');
        if (!response.ok) {
            throw new Error('Failed to fetch time from World Time API');
        }
        const timeData = await response.json();
        const localDate = timeData.datetime.split('T')[0]; // Extract the date in 'YYYY-MM-DD' format

        console.log('current date (World Time API):', localDate);

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
