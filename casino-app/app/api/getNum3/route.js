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

        console.log('Current date (World Time API):', localDate);

        // Find the document with the current date
        let data = await Data.findOne({ date: localDate });

        if (!data) {
            // If no document exists for the current date, create a new one with a random 4-digit number for time3number
            const random4DigitNumber = Math.floor(1000 + Math.random() * 9000);
            data = new Data({
                date: localDate,
                time3number: random4DigitNumber,
            });
            await data.save();
            return new Response(JSON.stringify({ time3number: random4DigitNumber }), {
                status: 200,
            });
        } else {
            if (data.time3number === null || data.time3number === 0) {
                // If time3number is null or 0, generate a random 4-digit number and update the document
                const random4DigitNumber = Math.floor(1000 + Math.random() * 9000);
                data.time3number = random4DigitNumber;
                await data.save();
                return new Response(JSON.stringify({ time3number: random4DigitNumber }), {
                    status: 200,
                });
            } else {
                // If time3number is not null or 0, return the existing value
                return new Response(JSON.stringify({ time3number: data.time3number }), {
                    status: 200,
                });
            }
        }
    } catch (error) {
        console.log(error.message);
        return new Response("Failed to fetch data", { status: 500 });
    }
}

export const GET = handler;
