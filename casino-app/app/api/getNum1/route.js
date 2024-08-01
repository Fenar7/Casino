import { connectToDB } from '@/utils/database';
import Data from '@/models/datatable';

export default async function handler(req, res) {
    try {
        await connectToDB();
        const currentDate = new Date().toISOString().split('T')[0]; // Get only the date in 'YYYY-MM-DD' format

        // Find the document with the current date
        let data = await Data.findOne({ date: currentDate });

        if (!data) {
            // If no document exists for the current date, create a new one with a random 4-digit number for time1number
            const random4DigitNumber = Math.floor(1000 + Math.random() * 9000);
            data = new Data({
                date: currentDate,
                time1number: random4DigitNumber,
            });
            await data.save();
            return new Response(JSON.stringify({time1number:random4DigitNumber}),{
                status:200
            })
        } else {
            if (data.time1number === null) {
                // If time1number is null, generate a random 4-digit number and update the document
                const random4DigitNumber = Math.floor(1000 + Math.random() * 9000);
                data.time1number = random4DigitNumber;
                await data.save();
                return new Response(JSON.stringify({time1number:random4DigitNumber}),{
                    status:200
                })
            } else {
                // If time1number is not null, return the existing value
                return new Response(JSON.stringify({time1number:data.time1number}),{
                    status:200
                })
            }
        }
    } catch (error) {
        console.log(error.message);
        return new Response("Failed to fetch data", { status: 500 });
    }
}

export const GET = handler;
