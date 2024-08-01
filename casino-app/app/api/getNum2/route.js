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
        let data = await Data.findOne({ date: localDate });

        if (!data) {
            // If no document exists for the current date, create a new one with a random 4-digit number for time2number
            const random4DigitNumber = Math.floor(1000 + Math.random() * 9000);
            data = new Data({
                date: localDate,
                time2number: random4DigitNumber,
            });
            await data.save();
            return new Response(JSON.stringify({ time2number: random4DigitNumber }), {
                status: 200,
            });
        } else {
            if (data.time2number === null || data.time2number === 0) {
                // If time2number is null or 0, generate a random 4-digit number and update the document
                const random4DigitNumber = Math.floor(1000 + Math.random() * 9000);
                data.time2number = random4DigitNumber;
                await data.save();
                return new Response(JSON.stringify({ time2number: random4DigitNumber }), {
                    status: 200,
                });
            } else {
                // If time2number is not null and not 0, return the existing value
                return new Response(JSON.stringify({ time2number: data.time2number }), {
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
