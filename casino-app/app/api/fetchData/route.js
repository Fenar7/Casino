import { connectToDB } from '@/utils/database';
import Data from '@/models/datatable';

export default async function handler(req, res) {
    try {
        await connectToDB();
        const currentDate = new Date().toISOString().split('T')[0]; // Get only the date in 'YYYY-MM-DD' format

        // Find the document with the current date and update it, or insert a new document if it doesn't exist
        const oldData = await Data.findOne(
            { date: currentDate },
        );

        if(oldData){
            console.log(oldData)
            return new Response(JSON.stringify(oldData),{
                status:200
            });            
        }

    } catch (error) {
        console.log(error.message);
        return new Response("Failed to fetch Data", { status: 500 });
    }
}

export const GET = handler;
